"use client";

import { generateTOTPCode } from "@/lib/auth/auth";
import { useState } from "react";

export default function OTPDisplay({ secret }: { secret: string }) {
    const [code, setCode] = useState<string>("");
    setInterval(() => {
        setCode(generateTOTPCode(secret));
    });

    return (
        <div className="flex flex-row">
            {[...code].map((e, i) => {
                if (i === code.length - 1)
                    return <OTPCodeDigit digit={e} key={i} lastDigit={true} />;
                return <OTPCodeDigit digit={e} key={i} />;
            })}
        </div>
    );
}

function OTPCodeDigit({
    digit,
    key,
    className,
    lastDigit = false
}: {
    digit: string;
    key: any;
    className?: string;
    lastDigit?: boolean;
}) {
    return (
        <div
            className={
                "box-content h-10 w-10 border-2 border-black text-center text-xl font-bold leading-10 dark:border-slate-200 " +
                (!lastDigit ? "border-r-0" : "")
            }
        >
            {digit}
        </div>
    );
}
