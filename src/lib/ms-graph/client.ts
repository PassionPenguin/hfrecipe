import { MSGraphAuthProvider } from "./auth";
import { MSGraphDriveProvider } from "./drive";
import { MSGraphSecret } from "./secret";

export class MSGraphClient {
    private static _secret: MSGraphSecret | undefined;
    private static _authProvider: MSGraphAuthProvider | undefined;
    private static _driveProvider: MSGraphDriveProvider | undefined;

    public static get secret(): MSGraphSecret {
        if (!this._secret) {
            require("dotenv").config();
            const dskUserID = process.env.MSGRAPH_DSK_USER_ID,
                tenantID = process.env.MSGRAPH_TENANT_ID,
                clientID = process.env.MSGRAPH_CLIENT_ID,
                clientSecret = process.env.MSGRAPH_CLIENT_SECRET;
            MSGraphClient._secret = {
                dskUserID,
                tenantID,
                clientID,
                clientSecret
            };
        }
        return this._secret;
    }

    public static set secret(value: MSGraphSecret) {
        this._secret = value;
    }

    public static get authProvider(): MSGraphAuthProvider {
        if (!this._authProvider) {
            MSGraphClient._authProvider = new MSGraphAuthProvider();
        }
        return this._authProvider;
    }

    public static set authProvider(value: MSGraphAuthProvider) {
        this._authProvider = value;
    }

    public static get driveProvider(): MSGraphDriveProvider {
        if (!this._driveProvider) {
            MSGraphClient._driveProvider = new MSGraphDriveProvider();
        }
        return this._driveProvider;
    }

    public static set driveProvider(value: MSGraphDriveProvider) {
        this._driveProvider = value;
    }

    constructor() {
        const dskUserID = process.env.MSGRAPH_DSK_USER_ID,
            tenantID = process.env.MSGRAPH_TENANT_ID,
            clientID = process.env.MSGRAPH_CLIENT_ID,
            clientSecret = process.env.MSGRAPH_CLIENT_SECRET;
        MSGraphClient.secret = { dskUserID, tenantID, clientID, clientSecret };
        MSGraphClient.authProvider = new MSGraphAuthProvider();
        MSGraphClient.driveProvider = new MSGraphDriveProvider();
    }
}
