import Logo from "@/components/logo";
import Link from "next/link";
import { redirect } from "next/navigation";
import Frame from "@/components/frame/frame";
import React from "react";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";

export default function Register({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  let body: React.ReactElement,
    checkUser = protectServerRoutes();
  if (checkUser.status && checkUser.userName !== null) {
    redirect("/");
  } else {
    body = (
      /*
                [REGISTER SECTION]

                Register page.
            */
      <>
        <div className="mx-auto px-12 py-6 lg:w-[640px]">
          {/*
                [TITLE SECTION]

                Title of the sign-in page.
            */}
          <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
            <Logo size={"3xl"} />

            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight">
              Register HFRecipe Account
            </h2>
          </div>

          {/*
                [FORM SECTION]

                Form of the register page.
            */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:flex-row lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-2" action="#" method="POST">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6"
                  >
                    用户名
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 bg-white px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    邮箱
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 bg-white px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium leading-6"
                    >
                      邀请码
                    </label>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      12 位邀请码
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="code"
                      name="code"
                      type="code"
                      autoComplete="code"
                      required
                      className="block w-full rounded-md border-0 bg-white px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6"
                    >
                      密码
                    </label>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      大写、小写、数字、特殊符号（.,-_!）至少三种，长度 8-16
                      字符
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 bg-white px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    注册
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                已经有帐户？{" "}
                <Link
                  href="/user/signin"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  登录！
                </Link>
              </p>

              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                点击注册代表同意{" "}
                <Link
                  href="/about/term-of-service"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  服务协议
                </Link>
                、
                <Link
                  href="/about/privacy-policy"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  隐私协议
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Frame
      userRole={checkUser.userType}
      userName={checkUser.userName}
      body={body}
      searchParams={searchParams}
    />
  );
}
