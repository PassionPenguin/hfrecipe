import { MSGraphSecret } from "@/lib/ms-graph/secret";
import { MSGraphClient } from "@/lib/ms-graph/client";

export class MSGraphAuthProvider {
  expire: Date;
  extExpire: Date;
  token: string;
  type: string;

  constructor() {
    void this.updateAuthToken(MSGraphClient.secret);
  }

  async getToken(): Promise<string> {
    if (this.expire < new Date()) {
      await this.updateAuthToken(MSGraphClient.secret);
    }
    return this.type + " " + this.token;
  }

  async updateAuthToken(secret: MSGraphSecret): Promise<void> {
    /// API endpoint: https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
    /// Request body:
    /// {
    ///     "client_id": "{client-id}", // The application ID that the Azure app registration portal assigned when you registered your app.
    ///     "scope": "https://graph.microsoft.com/.default" // The value passed for the scope parameter in this request should be the identifier (app ID URI) of the resource you want, affixed with the .default suffix. For example, the Microsoft Graph resource app ID URI is https://graph.microsoft.com/. For Microsoft Graph, the value of scope is therefore https://graph.microsoft.com/.default. This value informs the Microsoft identity platform endpoint to include in the access token all the app-level permissions the admin has consented to.
    ///     "client_secret": "{client-secret}", // The client secret that you generated for your app in the app registration portal. Ensure that it's URL encoded.
    ///     "grant_type": "client_credentials", // Must be client_credentials.
    /// }
    /// Response:
    /// {
    ///    "token_type": "Bearer", // Indicates the token type value. The only type that Microsoft Entra ID supports is Bearer.
    ///    "expires_in": int, // How long the access token is valid (in seconds).
    ///    "ext_expires_in": int, // Used to indicate an extended lifetime for the access token and to support resiliency when the token issuance service isn't responding.
    ///    "access_token": string // The requested access token. Your app can use this token in calls to Microsoft Graph.
    /// }
    /// See: https://learn.microsoft.com/en-us/graph/auth-v2-service
    await fetch(
      "https://login.microsoftonline.com/" +
        secret.tenantID +
        "/oauth2/v2.0/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${secret.clientID}&client_secret=${secret.clientSecret}&scope=https://graph.microsoft.com/.default`,
      },
    ).then(async (res) => {
      let json = await res.json();
      this.type = json["token_type"];
      this.expire = new Date(json["expires_in"]);
      this.extExpire = new Date(json["ext_expires_in"]);
      this.token = json["access_token"];
    });
  }
}
