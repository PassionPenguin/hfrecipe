import Frame from "@/components/frame/frame";
import { protectServerRoutes } from "@/lib/auth/protectServerRoutes";

export default async function Home({
    searchParams
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    let checkUser = protectServerRoutes();

    const body = (
        <>
            <h1 className="font-serif text-5xl font-bold">霜羽 Hoarfroster</h1>
            <div className="markdown space-y-4 pb-8 pt-4">
                <h2 className="text-2xl font-bold">
                    霜羽 🍻 Collegue Student Here
                </h2>
                <p>Halo, here comes the Hoarfroster!</p>
                <h2 className="text-2xl font-bold" id="contacts">
                    Contacts
                </h2>
                <ul className="space-y-2">
                    <li>
                        <p>GitHub: PassionPenguin</p>
                    </li>
                    <li>
                        <p>Email: hoarfroster@outlook.com</p>
                    </li>
                    <li>
                        <p>Wikipedia: User:HoarfrostFeather</p>
                    </li>
                    <li>
                        <p>Dribbble: Hoarfroster</p>
                    </li>
                    <li>
                        <p>Behance: Hoarfroster</p>
                    </li>
                </ul>
            </div>
        </>
    );

    return (
        <Frame
            userRole={checkUser.userType}
            userName={checkUser.userName}
            body={body}
            searchParams={searchParams}
        />
    );
}
