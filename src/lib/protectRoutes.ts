import { checkTokenStatus } from "./auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "../app/user/usermodel";

enum PathPermission {
  None,
  SuperAdmin,
  Admin,
  User,
  Guest,
}

export function protectRoutes(): {
  status: boolean;
  userType: UserRole;
  userName: string | null;
} {
  const pathname = headers().get("X-PATHNAME") || "",
    token = cookies().get("TOKEN") || "";
  let { status, name } = token
    ? checkTokenStatus(token.value)
    : { status: UserRole.NotSignedIn, name: null };
  let permission = PathPermission.None;
  for (let route of _protectedRoutes) {
    if (route.matchers.map((route) => route.test(pathname)).includes(true)) {
      permission = route.type;
    }
  }
  if (permission === PathPermission.None)
    return { status: true, userType: status, userName: name };
  else {
    if (!token) {
      return { status: false, userType: UserRole.NotSignedIn, userName: null };
    } else {
      switch (status) {
        case UserRole.NotSignedIn:
          return {
            status: false,
            userType: UserRole.NotSignedIn,
            userName: null,
          };
        case UserRole.SuperAdmin:
          return {
            status: true,
            userType: UserRole.SuperAdmin,
            userName: name,
          };
        case UserRole.Admin:
          return {
            status: permission !== PathPermission.SuperAdmin,
            userType: UserRole.Admin,
            userName: name,
          };
        case UserRole.User:
          return {
            status:
              permission !== PathPermission.SuperAdmin &&
              permission !== PathPermission.Admin,
            userType: UserRole.User,
            userName: name,
          };
        case UserRole.Guest:
          return {
            status: permission === PathPermission.Guest,
            userType: UserRole.User,
            userName: name,
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
      RegExp(/\/recipe\/edit*/),
      RegExp(/\/recipe\/create*/),
      RegExp(/\/user\/edit*/),
      RegExp(/\/user\/create*/),
    ],
  },
  { type: PathPermission.Admin, matchers: [] },
  {
    type: PathPermission.User,
    matchers: [
      RegExp(/\/recipe\/*/),
      RegExp("/user/profile"),
      RegExp(/\/ingredients\/*/),
      RegExp(/\/tools\/*/),
    ],
  },
  { type: PathPermission.Guest, matchers: [] },
];
