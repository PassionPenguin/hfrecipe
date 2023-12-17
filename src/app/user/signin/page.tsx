import Frame from "@/components/frame/frame";
import Logo from "@/components/logo";
import { InputType, UIInput } from "@/components/ui/input";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function SignIn({
    searchParams
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
                      [SIGN-IN SECTION]

                      Sign-in page.
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
                            Signin to HFRecipe
                        </h2>
                    </div>

                    {/*
                [FORM SECTION]

                Form of the sign-in page.
            */}
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:flex-row lg:px-8">
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                className="space-y-2"
                                action="/api/user/signin"
                                method="POST"
                            >
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
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6"
                                        >
                                            密码
                                        </label>
                                        <div className="text-sm">
                                            <Link
                                                href="#"
                                                className="font-semibold text-indigo-600 hover:text-indigo-600 dark:text-indigo-400"
                                            >
                                                不准忘记密码
                                            </Link>
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

                                <UIInput
                                    type={InputType.number}
                                    name="otpCode"
                                    title="OTP Code"
                                    hint="6 digits code. (opt.)"
                                />

                                <div>
                                    <button
                                        type="submit"
                                        className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        登录
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                                还不是用户？{" "}
                                <Link
                                    href="/user/register"
                                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    注册！
                                </Link>
                            </p>

                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                                点击登录代表同意{" "}
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
