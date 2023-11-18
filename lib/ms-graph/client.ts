import { MSGraphAuthProvider } from "@/lib/ms-graph/auth";
import { MSGraphSecret } from "@/lib/ms-graph/secret";
import { MSGraphDriveProvider } from "@/lib/ms-graph/drive";

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
