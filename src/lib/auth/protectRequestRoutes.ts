import { UserRole } from "@/app/user/usermodel";
import { protectRoutes } from "@/lib/auth/protectRoutes";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export function protectRequestRoutes(request: NextRequest): {
    status: boolean;
    userType: UserRole;
    userName: string | null;
} {
    return protectRoutes({
        pathname: request.nextUrl.pathname,
        token: request.cookies.get("TOKEN")?.value ?? ""
    });
}

export function protectAPIRequestRoutes(request: NextApiRequest): {
    status: boolean;
    userType: UserRole;
    userName: string | null;
} {
    return protectRoutes({
        pathname: new URL(request.url).pathname,
        token:
            (request as unknown as NextRequest).cookies.get("TOKEN").value ?? ""
    });
}
