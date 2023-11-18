import React from "react";
import { UserRole } from "@/app/user/usermodel";
import Header from "./header";
import Footer from "./footer";
import Banner from "../banner";

export default function Frame({
  userRole,
  userName,
  body,
  searchParams,
}: {
  userRole: UserRole;
  userName: string | null;
  body: any;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <>
      <Header userRole={userRole} userName={userName} />
      <main className="container my-24 mx-auto px-8 relative">
        <Banner
          state={searchParams["state"] === "true"}
          msg={`${searchParams["msg"]}`}
        />
        {body}
      </main>
      <Footer />
    </>
  );
}
