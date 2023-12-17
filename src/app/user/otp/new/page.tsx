import React from "react";
import {protectServerRoutes} from "@/lib/auth/protectServerRoutes";
import {InputType, UIInput} from "@/components/ui/input";
import Frame from "@/components/frame/frame";
import {generateTOTPSecret} from "@/lib/auth/auth";
import OTPDisplay from "@/app/user/otp/otp-display";

export default async function CreateOTP({
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
        let totpSecret = generateTOTPSecret();

        let otpUrl = `otpauth://totp/HFRecipe:${checkUser.userName}?secret=${totpSecret}&issuer=Hoarfroster`;

        console.log(otpUrl);
        const QRCode = require('qrcode');

        let qrCodeUrl: string = await (new Promise((resolve, reject) => QRCode.toDataURL(otpUrl, function (err: Error, url: string) {
            if (err) reject(err);
            else resolve(url);
        })));

        body = (
            <div>
                <form
                    action={"/api/user/otp/new"}
                    method="POST"
                    className="space-y-4"
                >
                    <h1 className="py-4 text-3xl font-bold">
                        Create OTP
                    </h1>
                    <p>Scan the QRCode below with your authenticator application to save the OTP secret.</p>
                    <img src={qrCodeUrl} alt="OTP QR Code"/>
                    <p>And verify if the code on your authenticator application matches the code below.</p>
                    <OTPDisplay secret={totpSecret}/>
                    <UIInput type={InputType.hidden} name="secret" title="Secret" defaultValue={totpSecret}/>
                    <UIInput type={InputType.hidden} name="userId" title="User ID" defaultValue={checkUser.userId}/>
                    <UIInput
                        type={InputType.submit}
                        name="submit"
                        title="Submit new OTP Secret"
                    />
                </form>
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