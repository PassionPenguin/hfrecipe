"use client";

import {UserRole} from "@/app/user/usermodel";
import ClientFrame from "@/components/frame/clientFrame";
import Loading, {LoadingSkeletonType} from "@/components/loading";
import {InputType, UIInput, UITextarea} from "@/components/ui/input";
import {protectClientRoutes} from "@/lib/auth/protectClientRoutes";
import nanoid from "@/lib/nanoid";
import Cookies from "js-cookie";
import {
    ReadonlyURLSearchParams,
    usePathname,
    useSearchParams
} from "next/navigation";
import React, {useEffect, useState} from "react";

export default function IngredientBatchCreate() {
    const [checkUser, setCheckUser] = useState({
        status: false,
        userType: UserRole.Guest,
        userName: ""
    });
    let searchParams: ReadonlyURLSearchParams = useSearchParams(),
        pathname = usePathname();
    let body: React.ReactElement;

    const [ingredients, setIngredients] = useState([]);
    const [inserts, setInserts] = useState("");
    const [log, setLog] = useState("");

    useEffect(() => {
        setCheckUser(
            protectClientRoutes({
                pathname: pathname,
                token: Cookies.get("TOKEN")
            })
        );
        fetch("/api/ingredient/list").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setIngredients(data);
                });
            }
        });
    }, []);

    function generateInserts(fd: FormData) {
        let input = fd.get("input") as string;
        let r = "";

        input.split("|").forEach((e) => {
            const s = new RegExp(/(.+?)-(.+?)$/g),
                m = s.exec(e);
            if (m === null) return;
            try {
                if (ingredients.find((df) => df.title === m[1]) === undefined) {
                    let id = nanoid({length: 12})
                    r += `INSERT INTO public."Ingredient" ("publicId", description, title) VALUES ('${id}', '${m[2].replaceAll("'", "''")}', '${m[1].replaceAll("'", "''")}');\n`;
                }
            } catch (e) {
                setLog(log + "\n" + e.toString());
            }
        });
        setInserts(r);
    }

    function execInserts() {
        let fd = new FormData();
        fd.set("ddl", inserts);
        fetch("/api/sql/exec", {
            method: "POST",
            body: fd
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setLog(log + "\n" + data);
                });
            }
        });
    }

    if (ingredients.length === 0) {
        body = <Loading type={LoadingSkeletonType.text}/>;
    } else {
        body = (
            <>
                <form action={generateInserts} className="space-y-4">
                    <UITextarea
                        name="input"
                        title="Ingredients List"
                        hint="{NAME}-{DESC}|..."
                    />
                    <UIInput
                        type={InputType.submit}
                        name="submit"
                        title="Generate DDL"
                    />
                </form>
                <form action={execInserts} className="space-y-4">
                    <pre>
                        <code>{inserts}</code>
                    </pre>
                    <UIInput
                        type={InputType.submit}
                        name="submit"
                        title="Submit DDL"
                    />
                </form>
                <pre>
                    <code>{log}</code>
                </pre>
            </>
        );
    }

    if (checkUser === undefined)
        return <Loading type={LoadingSkeletonType.text}/>;
    else
        return (
            <ClientFrame
                userRole={checkUser.userType}
                userName={checkUser.userName}
                body={body}
                state={searchParams.get("state")}
                msg={searchParams.get("msg")}
            />
        );
}
