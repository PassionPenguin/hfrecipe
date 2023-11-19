"use client";

import React, { useEffect, useState } from "react";
import Loading, { LoadingSkeletonType } from "@/components/loading";
import { InputType, UIInput, UITextarea } from "@/components/ui/input";
import ClientFrame from "@/components/frame/clientFrame";
import {
  ReadonlyURLSearchParams,
  useSearchParams,
  usePathname,
} from "next/navigation";
import Cookies from "js-cookie";
import { UserRole } from "@/app/user/usermodel";
import { protectClientRoutes } from "@/lib/auth/protectClientRoutes";
import nanoid from "@/lib/nanoid";
import { objToString } from "@/lib/utils/deserializeObj";

export default function ToolBatchCreate() {
  const [tools, setTools] = useState([]);
  const [inserts, setInserts] = useState("");
  let body: React.ReactElement;
  const [checkUser, setCheckUser] = useState({
    status: false,
    userType: UserRole.Guest,
    userName: "",
  });
  let searchParams: ReadonlyURLSearchParams = useSearchParams(),
    pathname = usePathname();
  const [log, setLog] = useState("");

  useEffect(() => {
    setCheckUser(
      protectClientRoutes({
        pathname: pathname,
        token: Cookies.get("TOKEN"),
      }),
    );
    fetch("/api/tool/list").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setTools(data);
        });
      }
    });
  }, []);

  function generateInserts(fd: FormData) {
    let rId = fd.get("rId") as string,
      input = fd.get("input") as string;

    const units = [
      { name: "g", id: "0000" },
      { name: "mL", id: "0001" },
      { name: "x", id: "0010" },
    ];
    let r = "";

    input.split("|").forEach((e) => {
      const s = new RegExp(/(.+?)-(\d+)(.+?)$/g),
        m = s.exec(e);
      if (m === null) return;
      try {
        if (tools.find((df) => df.title === m[1]) === undefined) {
          r += `INSERT INTO public."Tool" ("publicId", description, title) VALUES ('${nanoid(
            { length: 12 },
          )}', '', '${m[1].replaceAll("'", "''")}');\n`;
        }
      } catch (e) {
        setLog(log + "\n" + e.toString());
      }
    });
    setInserts(r);
  }

  function execInserts(fd: FormData) {
    let inserts = fd.get("inserts") as string,
      body = new FormData();
    body.set("ddl", inserts);

    fetch("/api/sql/exec", {
      method: "POST",
      body: body,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setLog(log + "\n" + data);
        });
      }
    });
  }

  if (tools.length === 0) {
    body = <Loading type={LoadingSkeletonType.text} />;
  } else {
    body = (
      <>
        <form action={generateInserts} className="space-y-4">
          <UITextarea
            name="input"
            title="Original relationships"
            hint="{N}-{A}{U}|..."
          />
          <UIInput type={InputType.submit} name="submit" title="Generate DDL" />
        </form>
        <form action={execInserts} className="space-y-4">
          <UIInput
            type={InputType.hidden}
            name="inserts"
            title="Inserts"
            value={inserts}
          />
          <pre>
            <code>{inserts}</code>
          </pre>
          <UIInput type={InputType.submit} name="submit" title="Submit DDL" />
        </form>
        <pre>
          <code>{log}</code>
        </pre>
      </>
    );
  }

  if (checkUser === undefined)
    return <Loading type={LoadingSkeletonType.text} />;
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