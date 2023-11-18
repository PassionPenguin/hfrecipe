import { MSGraphSecret } from "@/lib/ms-graph/secret";
import { MSGraphClient } from "@/lib/ms-graph/client";
import { MSGraphDriveItem } from "@/lib/ms-graph/model";

export class MSGraphDriveProvider {
  dskUserID: string;

  constructor() {
    this.dskUserID = MSGraphClient.secret.dskUserID;
  }

  async getDriveItem(path: string): Promise<MSGraphDriveItem> {
    /// API endpoint: https://graph.microsoft.com/v1.0/users/{dsk-user-id}/drive/root:{path}
    /// Response: DriveItem
    /// See: https://learn.microsoft.com/en-us/graph/api/driveitem-get
    return await fetch(
      "https://graph.microsoft.com/v1.0/users/" +
        this.dskUserID +
        "/drive/root:" +
        path,
      {
        headers: {
          Authorization: await MSGraphClient.authProvider.getToken(),
        },
      },
    ).then(async (res) => {
      return (await res.json()) as MSGraphDriveItem;
    });
  }

  async getDriveItemContent(path: string): Promise<any> {
    /// API endpoint: https://graph.microsoft.com/v1.0/users/{dsk-user-id}/drive/root:{path}/content
    /// Response: HTTP 302 Found Redirect
    /// See: https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
    return await fetch(
      "https://graph.microsoft.com/v1.0/users/" +
        this.dskUserID +
        "/drive/root:" +
        path +
        ":/content",
      {
        headers: {
          Authorization: await MSGraphClient.authProvider.getToken(),
        },
      },
    ).then(async (res) => {
      return res;
    });
  }

  async getDriveItemURL(path: string): Promise<string> {
    /// API endpoint: https://graph.microsoft.com/v1.0/users/{dsk-user-id}/drive/root:{path}/content
    /// Response: HTTP 302 Found Redirect
    /// See: https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
    return await fetch(
      "https://graph.microsoft.com/v1.0/users/" +
        this.dskUserID +
        "/drive/root:" +
        path +
        "?select=@microsoft.graph.downloadUrl",
      {
        headers: {
          Authorization: await MSGraphClient.authProvider.getToken(),
        },
      },
    ).then(async (res) => {
      if (res.status != 200) {
        throw new Error("Failed to get file url.");
      }
      return (await res.json())["@microsoft.graph.downloadUrl"];
    });
  }
}
