import { UserRole } from "@/app/user/usermodel";
import { protectRoutes } from "@/lib/auth/protectRoutes";

export function protectClientRoutes({
    pathname,
    token
}: {
    pathname: string;
    token: string;
}): {
    status: boolean;
    userType: UserRole;
    userName: string | null;
} {
    return protectRoutes({ pathname, token });
}
