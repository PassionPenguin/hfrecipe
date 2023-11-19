import { cookies, headers } from "next/headers";
import { UserRole } from "@/app/user/usermodel";
import { protectRoutes } from "@/lib/auth/protectRoutes";

export function protectServerRoutes(): {
  status: boolean;
  userType: UserRole;
  userName: string | null;
} {
  return protectRoutes({
    pathname: headers().get("X-PATHNAME") || "",
    token: cookies().get("TOKEN")?.value || "",
  });
}
