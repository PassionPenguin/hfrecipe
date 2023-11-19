import { UserRole } from "@/app/user/usermodel";
import Banner from "../banner";
import Footer from "./footer";
import Header from "./header";

export default function ClientFrame({
    userRole,
    userName,
    body,
    state,
    msg
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
            <main className="container relative mx-auto my-24 px-8">
                <Banner state={state === "true"} msg={`${msg}`} />
                {body}
            </main>
            <Footer />
        </>
    );
}
