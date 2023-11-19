import { UserRole } from "@/app/user/usermodel";
import Banner from "../banner";
import Footer from "./footer";
import Header from "./header";

export default function Frame({
    userRole,
    userName,
    body,
    searchParams
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
            <main className="container relative mx-auto my-24 px-8">
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
