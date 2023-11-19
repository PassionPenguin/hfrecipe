import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Banner({
  state,
  msg,
}: {
  state: boolean;
  msg: string;
}) {
  if (msg !== "undefined" && msg !== "null") {
    return (
      <div
        className={
          "rounded bg-slate-100 dark:bg-slate-900 flex flex-row px-8 py-4 " +
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
