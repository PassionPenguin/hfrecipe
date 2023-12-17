import React from "react";
import {protectServerRoutes} from "@/lib/auth/protectServerRoutes";
import {InputType, UIInput} from "@/components/ui/input";
import Frame from "@/components/frame/frame";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UIButton, {ButtonType} from "@/components/ui/button";
import UIText, {UITextType} from "@/components/ui/text";

export default async function OTPSettingsPage({
                                                  params,
                                                  searchParams
                                              }: {
    params: {
        id: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}) {
    let body: React.ReactElement,
        checkUser = protectServerRoutes();
    if (!checkUser.status) {
        body = <>NO PERMISSION</>;
    } else {
        let otpEnabled = (await prisma.user.findFirst({
            where: {publicId: checkUser.userId},
            select: {otpSalt: true}
        })).otpSalt !== null, otpDisableForm = (
            <form
                action={"/api/user/otp/new"}
                method="POST"
                className="space-y-4"
            >
                <UIInput type={InputType.hidden} name="secret" title="Secret" defaultValue=""/>
                <UIInput type={InputType.hidden} name="userId" title="User ID" defaultValue={checkUser.userId}/>
                <UIInput
                    type={InputType.submit}
                    name="submit"
                    title="Disable OTP"
                />
            </form>
        );
        body = (
            <div className="space-y-4">
                <UIText type={UITextType.h1} source="OTP Settings" />
                <p>OTP(one-time password) enables a 2FA(two-factor authentication) method for your account, securing
                    your account in a higher level.</p>
                {otpEnabled ? otpDisableForm : ""}
                <br />
                <Link href="/user/otp/new">
                    <UIButton title="Update OTP Secret" buttonType={ButtonType.default}/>
                </Link>
            </div>
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