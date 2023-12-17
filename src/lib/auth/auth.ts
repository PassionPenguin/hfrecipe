import {decodeUserRole, UserRole} from "@/app/user/usermodel";
import {decode, encode, TAlgorithm} from "jwt-simple";
import * as process from "process";
import * as crypto from "crypto";

export interface Session {
    id: string;
    dateCreated: number;
    name: string;
    role: string;
    /** Timestamp indicating when the session was created, in Unix milliseconds. */
    issued: number;
    /**
     * Timestamp indicating when the session should expire, in Unix
     * milliseconds.
     */
    expires: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires`
 * properties.
 */
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
    token: string;
    expires: number;
    issued: number;
}

export type DecodeResult =
    | {
    type: "valid";
    session: Session;
}
    | {
    type: "integrity-error";
}
    | {
    type: "invalid-token";
};

export type ExpirationStatus = "expired" | "active" | "grace";
export type TokenStatus = "expired" | "superAdmin" | "admin" | "user" | "guest";

export function encodeSession(
    secretKey: string,
    partialSession: PartialSession
): EncodeResult {
    // Always use HS512 to sign the token
    const algorithm: TAlgorithm = "HS512";
    // Determine when the token should expire
    const issued = Date.now();
    const fifteenMinutesInMs = 7 * 24 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}

function decodeSession(secretKey: string, tokenString: string): DecodeResult {
    // Always use HS512 to decode the token
    const algorithm: TAlgorithm = "HS512";

    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (_e) {
        const e: Error = _e;

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (
            e.message === "No token supplied" ||
            e.message === "Not enough or too many segments"
        ) {
            return {
                type: "invalid-token"
            };
        }

        if (
            e.message === "Signature verification failed" ||
            e.message === "Algorithm not supported"
        ) {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }

    return {
        type: "valid",
        session: result
    };
}

export function checkTokenStatus(tokenString: string): {
    status: UserRole;
    name: string | null;
    id: string | null;
} {
    let result = decodeSession(process.env.CRYPTO_SALT, tokenString);
    if (result.type === "valid") {
        let session = result.session;
        return {status: decodeUserRole(session.role), name: session.name, id: session.id};
    } else {
        return {status: UserRole.NotSignedIn, name: null, id: null};
    }
}

export async function hashPassword(password: string): Promise<string> {
    const utf8 = new TextEncoder().encode(process.env.CRYPTO_SALT + password);
    return await crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray
            .map((bytes) => bytes.toString(16).padStart(2, "0"))
            .join("");
    });
}

function base32Encode(buffer: Buffer): string {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < buffer.length; i++) {
        value = (value << 8) | buffer[i];
        bits += 8;

        while (bits >= 5) {
            output += base32Chars[(value >>> (bits - 5)) & 0x1F];
            bits -= 5;
        }
    }

    if (bits > 0) {
        output += base32Chars[(value << (5 - bits)) & 0x1F];
    }

    return output;
}

export function generateTOTPSecret(): string {
    const randomBytes = crypto.randomBytes(10); // Adjust the number of bytes as needed
    const base32Encoded = base32Encode(randomBytes);

    // Ensure the secret is 16 characters long
    return base32Encoded.substring(0, 16);
}

function base32Decode(encoded: string): Buffer {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const base32Lookup: { [char: string]: number } = {};
    for (let i = 0; i < base32Chars.length; i++) {
        base32Lookup[base32Chars[i]] = i;
    }

    const bitsPerChar = 5;
    const output = [];
    let buffer = 0;
    let bufferLength = 0;

    for (const char of encoded) {
        const charValue = base32Lookup[char.toUpperCase()];
        if (charValue === undefined) {
            throw new Error(`Invalid base32 character: ${char}`);
        }

        buffer = (buffer << bitsPerChar) | charValue;
        bufferLength += bitsPerChar;

        if (bufferLength >= 8) {
            output.push((buffer >> (bufferLength - 8)) & 0xFF);
            bufferLength -= 8;
        }
    }

    return Buffer.from(output);
}

export function generateTOTPCode(secret: string): string {
    let time = Math.floor(Date.now() / 1000 / 30); // 30-second intervals
    const timeBuffer = Buffer.alloc(8);

    for (let i = 7; i >= 0; i--) {
        timeBuffer.writeUInt8(time & 0xff, i);
        time >>= 8;
    }

    const decodedSecret = base32Decode(secret);

    const hmac = crypto.createHmac('sha1', decodedSecret);
    hmac.update(timeBuffer);

    const hash = hmac.digest();
    const offset = hash[hash.length - 1] & 0xf;
    const code = (hash.readUInt32BE(offset) & 0x7fffffff) % 1000000;

    return code.toString().padStart(6, '0');
}