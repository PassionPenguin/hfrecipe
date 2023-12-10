"use client";
import { InputType, UIInput } from "@/components/ui/input";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function UILabelSelect({
    defaultValue,
    name,
    title
}: {
    defaultValue: string;
    name: string;
    title: string;
}) {
    const [labelModal, setLabelModal] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const submitRawIDs = (d: FormData) => {
        let ids = d.get("rawIDs") as string;
        setValue(ids);
        setLabelModal(false);
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor={name}
                        className="block text-sm font-medium leading-6"
                    >
                        {title}
                    </label>
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        type="text"
                        disabled
                        name={name}
                        id={name}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 sm:text-sm  sm:leading-6"
                        defaultValue={value}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <FontAwesomeIcon
                            icon={faEdit}
                            className=""
                            onClick={() => setLabelModal(true)}
                        />
                    </div>
                </div>
            </div>

            <Dialog
                as="div"
                open={labelModal}
                onClose={setLabelModal}
                aria-label="header-nav-sm:menu"
            >
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 left-24 right-24 z-50 m-auto w-full overflow-y-auto bg-white px-6 py-6 dark:bg-slate-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex flex-col items-center justify-between space-y-4">
                        <p className="text-3xl font-bold">Select IDs</p>
                        <form action={submitRawIDs}>
                            <UIInput
                                type={InputType.text}
                                name="rawIDs"
                                title="Raw IDs"
                                defaultValue={value}
                                hint="Separated by comma"
                            />
                            <p>
                                {value.split(",").map((e) => (
                                    <span className="bg-blue-200 dark:bg-blue-800">
                                        {e}
                                    </span>
                                ))}
                            </p>
                            <UIInput
                                type={InputType.submit}
                                name="submit"
                                title="Submit"
                            />
                        </form>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6"></div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}
