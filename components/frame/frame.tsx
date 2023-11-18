import React from "react";
import { UserRole } from "@/app/user/usermodel";
import Header from "@/components/frame/header";
import Footer from "@/components/frame/footer";
import Banner from "@/components/banner";

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
      <main className="container my-24 mx-auto px-8">
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
