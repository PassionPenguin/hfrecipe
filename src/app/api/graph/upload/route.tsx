import { protectAPIRoutes } from "@/lib/auth/protectAPIRoutes";
import { MSGraphClient } from "@/lib/ms-graph/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    let checkStatus = protectAPIRoutes(req);
    if (!checkStatus.status) {
        return NextResponse.json({ error: "NO PERMISSION" });
    }

    const file = req.body,
        name = req.nextUrl.searchParams.get("name");

    // Read the file stream into a buffer
    const fileBuffer = await streamToBuffer(file);

    // Create a ReadableStream from the buffer
    const bufferStream = new ReadableStream({
        start(controller) {
            controller.enqueue(fileBuffer);
            controller.close();
        }
    });
    try {
        let result = await MSGraphClient.driveProvider.uploadDriveItem(
            "/hfsitedata/rcphf/" + name,
            bufferStream
        );
        if (result != undefined && !("error" in result)) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false });
    }
}

// Utility function to convert a ReadableStream to a Buffer
async function streamToBuffer(stream) {
    const chunks = [];
    const reader = stream.getReader();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        chunks.push(value);
    }

    return Buffer.concat(chunks);
}
