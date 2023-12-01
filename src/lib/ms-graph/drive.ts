import { MSGraphClient } from "./client";
import {MSGraphDriveItem, MSGraphError} from "./model";

export class MSGraphDriveProvider {
    dskUserID: string;

    constructor() {
        this.dskUserID = MSGraphClient.secret.dskUserID;
    }

    async getDriveItem(path: string): Promise<MSGraphDriveItem | MSGraphError> {
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
                    Authorization: await MSGraphClient.authProvider.getToken()
                }
            }
        ).then(async (res) => {
            return (await res.json()) as MSGraphDriveItem | MSGraphError;
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
                    Authorization: await MSGraphClient.authProvider.getToken()
                }
            }
        ).then(async (res) => {
            return res;
        });
    }

    async getDriveItemURL(path: string): Promise<string | null> {
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
                    Authorization: await MSGraphClient.authProvider.getToken()
                }
            }
        ).then(async (res) => {
            if (res.status != 200) {
                return null;
            }
            return (await res.json())["@microsoft.graph.downloadUrl"];
        });
    }

    async uploadDriveItem(path: string, content: any): Promise<MSGraphDriveItem | MSGraphError> {
        /// API endpoint: https://graph.microsoft.com/v1.0/users/{dsk-user-id}/drive/root:{path}:/content
        /// Response: DriveItem
        /// See: https://learn.microsoft.com/en-us/graph/api/driveitem-put-content
        return await fetch(
            "https://graph.microsoft.com/v1.0/users/" +
                this.dskUserID +
                "/drive/root:" +
                path +
                ":/content",
            {
                method: "PUT",
                headers: {
                    Authorization: await MSGraphClient.authProvider.getToken(),
                    'Content-Type': 'application/octet-stream'
                },
                body: content,
                duplex: 'half'
            }
        ).then(async (res) => {
            return (await res.json()) as MSGraphDriveItem | MSGraphError;
        });
    }
}
