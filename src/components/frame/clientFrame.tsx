import React from "react";
import { UserRole } from "@/app/user/usermodel";
import Header from "./header";
import Footer from "./footer";
import Banner from "../banner";

export default function ClientFrame({
  userRole,
  userName,
  body,
  state,
  msg,
}: {
  userRole: UserRole;
  userName: string | null;
  body: any;
  state?: string;
  msg?: string;
}) {
  return (
    <>
      <Header userRole={userRole} userName={userName} />
      <main className="container my-24 mx-auto px-8 relative">
        <Banner state={state === "true"} msg={`${msg}`} />
        {body}
      </main>
      <Footer />
    </>
  );
}
