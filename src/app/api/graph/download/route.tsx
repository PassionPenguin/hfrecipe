import { protectRequestRoutes } from "@/lib/auth/protectRequestRoutes";
import { MSGraphClient } from "@/lib/ms-graph/client";
import { MSGraphDriveItem, MSGraphError } from "@/lib/ms-graph/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let checkStatus = protectRequestRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    let path = req.headers.get("GraphPath") ?? "",
        result: MSGraphDriveItem | MSGraphError;
    try {
        result = await MSGraphClient.driveProvider.getDriveItem(path);
    } catch (e) {
        result = { error: e };
    }
    if (result !== undefined && result["error"] === undefined) {
        return NextResponse.json(result);
    } else {
        return NextResponse.json({ error: "NOT FOUND" });
    }
}
