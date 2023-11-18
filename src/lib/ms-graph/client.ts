import { MSGraphAuthProvider } from "./auth";
import { MSGraphSecret } from "./secret";
import { MSGraphDriveProvider } from "./drive";

export class MSGraphClient {
  public static secret: MSGraphSecret;
  public static authProvider: MSGraphAuthProvider;
  public static driveProvider: MSGraphDriveProvider;

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
