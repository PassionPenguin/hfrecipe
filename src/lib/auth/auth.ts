import { decode, encode, TAlgorithm } from "jwt-simple";
import { decodeUserRole, UserRole } from "@/app/user/usermodel";
import * as process from "process";

export interface Session {
  id: string;
  dateCreated: number;
  name: string;
  role: string;
  /**
   * Timestamp indicating when the session was created, in Unix milliseconds.
   */
  issued: number;
  /**
   * Timestamp indicating when the session should expire, in Unix milliseconds.
   */
  expires: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
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
  partialSession: PartialSession,
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
    expires: expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued: issued,
    expires: expires,
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
        type: "invalid-token",
      };
    }

    if (
      e.message === "Signature verification failed" ||
      e.message === "Algorithm not supported"
    ) {
      return {
        type: "integrity-error",
      };
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (e.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token",
      };
    }

    throw e;
  }

  return {
    type: "valid",
    session: result,
  };
}

export function checkTokenStatus(tokenString: string): {
  status: UserRole;
  name: string | null;
} {
  let result = decodeSession(process.env.CRYPTO_SALT, tokenString);
  if (result.type === "valid") {
    let session = result.session;
    return { status: decodeUserRole(session.role), name: session.name };
  } else {
    return { status: UserRole.NotSignedIn, name: null };
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
