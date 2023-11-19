import { UserRole } from "@/app/user/usermodel";
import { protectRoutes } from "@/lib/auth/protectRoutes";
import { NextRequest } from "next/server";

export function protectAPIRoutes(request: NextRequest): {
  status: boolean;
  userType: UserRole;
  userName: string | null;
} {
  return protectRoutes({
    pathname: request.nextUrl.pathname,
    token: request.cookies.get("TOKEN")?.value ?? "",
  });
}
