import { UserRole } from "@/app/user/usermodel";
import { checkTokenStatus } from "./auth";

export enum PathPermission {
    None,
    SuperAdmin,
    Admin,
    User,
    Guest
}

export function protectRoutes({
    pathname,
    token
}: {
    pathname: string;
    token: string;
}): {
    status: boolean;
    userType: UserRole;
    userName: string | null;
    userId: string | null;
} {
    let { status, name, id } = token
        ? checkTokenStatus(token)
        : { status: UserRole.NotSignedIn, name: null, id: null };
    let permission = PathPermission.None;
    for (let route of _protectedRoutes) {
        if (
            route.matchers.map((route) => route.test(pathname)).includes(true)
        ) {
            permission = route.type;
        }
    }
    if (permission === PathPermission.None)
        return { status: true, userType: status, userName: name, userId: id };
    else {
        if (!token) {
            return {
                status: false,
                userType: UserRole.NotSignedIn,
                userName: null,
                userId: null
            };
        } else {
            switch (status) {
                case UserRole.NotSignedIn:
                    return {
                        status: false,
                        userType: UserRole.NotSignedIn,
                        userName: null,
                        userId: null
                    };
                case UserRole.SuperAdmin:
                    return {
                        status: true,
                        userType: UserRole.SuperAdmin,
                        userName: name,
                        userId: id
                    };
                case UserRole.Admin:
                    return {
                        status: permission !== PathPermission.SuperAdmin,
                        userType: UserRole.Admin,
                        userName: name,
                        userId: id
                    };
                case UserRole.User:
                    return {
                        status:
                            permission !== PathPermission.SuperAdmin &&
                            permission !== PathPermission.Admin,
                        userType: UserRole.User,
                        userName: name,
                        userId: id
                    };
                case UserRole.Guest:
                    return {
                        status: permission === PathPermission.Guest,
                        userType: UserRole.User,
                        userName: name,
                        userId: id
                    };
            }
        }
    }
}

// Exclusive to users
export const _protectedRoutes = [
    {
        type: PathPermission.SuperAdmin,
        matchers: [
            RegExp(/^\/recipe\/(edit|create)/),
            RegExp(/^\/user\/(edit|create)/),
            RegExp(/^\/api\/(sql|graph)\/*/),
            RegExp(/^\/graph*/)
        ]
    },
    { type: PathPermission.Admin, matchers: [] },
    {
        type: PathPermission.User,
        matchers: [
            RegExp(/^\/user\/(profile|otp)/),
            RegExp(/^\/api\/(recipe|ingredient|cuisineType|tool)\/*/)
        ]
    },
    { type: PathPermission.Guest, matchers: [] }
];
