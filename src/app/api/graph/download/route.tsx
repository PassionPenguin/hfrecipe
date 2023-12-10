import {protectAPIRoutes} from "@/lib/auth/protectAPIRoutes";
import {MSGraphClient} from "@/lib/ms-graph/client";
import {NextRequest, NextResponse} from "next/server";
import {MSGraphDriveItem, MSGraphError} from "@/lib/ms-graph/model";

export async function GET(req: NextRequest) {
    let checkStatus = protectAPIRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({error: "NO PERMISSION"});
    }

    let path = req.headers.get("GraphPath") ?? "", result: MSGraphDriveItem | MSGraphError;
    try {
        result = await MSGraphClient.driveProvider.getDriveItem(path);
    } catch (e) {
        result = {error: e};
    }
    if (result !== undefined && result['error'] === undefined) {
        return NextResponse.json(result);
    } else {
        return NextResponse.json({error: "NOT FOUND"});
    }
}
