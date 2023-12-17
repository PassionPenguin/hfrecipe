'use client'

import {useState} from "react";
import {generateTOTPCode} from "@/lib/auth/auth";

export default function OTPDisplay({secret}: { secret: string }) {
    const [code, setCode] = useState<string>("");
    setInterval(() => {
        setCode(generateTOTPCode(secret));
    });

    return <div className="flex flex-row">
        {[...code].map((e, i) => {
            if (i === code.length - 1) return <OTPCodeDigit digit={e} key={i} lastDigit={true}/>
            return <OTPCodeDigit digit={e} key={i}/>
        })}
    </div>
}

function OTPCodeDigit({digit, key, className, lastDigit = false}: {
    digit: string,
    key: any,
    className?: string,
    lastDigit?: boolean
}) {
    return <div className={"box-content w-10 h-10 text-center leading-10 border-2 font-bold text-xl border-black dark:border-slate-200 " + (!lastDigit ? "border-r-0" : "")}>{digit}</div>
}