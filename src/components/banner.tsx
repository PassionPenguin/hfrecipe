export default function Banner({
    state,
    msg
}: {
    state: boolean;
    msg: string;
}) {
    if (msg !== "undefined" && msg !== "null") {
        return (
            <div
                className={
                    "flex flex-row rounded bg-slate-100 px-8 py-4 dark:bg-slate-900 " +
                    (state
                        ? "text-green-800 dark:text-green-200"
                        : "text-red-800 dark:text-red-200")
                }
            >
                <div className="flex-grow items-center gap-x-4 gap-y-2">
                    <p>
                        <b>Notice</b>: {msg}
                    </p>
                </div>
            </div>
        );
    } else return <></>;
}
