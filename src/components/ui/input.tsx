import UILabelSelect from "@/components/ui/uilabel";
import React from "react";

export enum InputType {
    text = "text",
    number = "number",
    password = "password",
    email = "email",
    date = "date",
    time = "time",
    datetime = "datetime",
    datetimeLocal = "datetime-local",
    month = "month",
    week = "week",
    url = "url",
    search = "search",
    tel = "tel",
    color = "color",
    file = "file",
    hidden = "hidden",
    image = "image",
    range = "range",
    reset = "reset",
    submit = "submit",
    multilabels = "multilabels"
}

export function UIInput({
    type,
    name,
    title,
    hint,
    defaultValue,
    placeholder,
    prefix,
    suffix,
    ...props
}: Readonly<
    {
        type: InputType;
        name: string;
        title: string;
        hint?: string;
        defaultValue?: string | number;
        placeholder?: string;
        prefix?: React.ReactElement;
        suffix?: React.ReactElement;
    } & React.InputHTMLAttributes<HTMLInputElement>
>) {
    if (type === InputType.hidden) {
        return <input type={type} name={name} value={defaultValue} readOnly />;
    } else if (type === InputType.submit) {
        return (
            <button
                type={type}
                name={name}
                className="mx-auto block rounded border-2 border-slate-900 px-8 py-2 text-center dark:border-slate-100"
            >
                {title}
            </button>
        );
    } else if (type === InputType.multilabels) {
        return (
            <UILabelSelect
                defaultValue={defaultValue as string}
                name={name}
                title={title}
            />
        );
    }
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6"
                >
                    {title}
                </label>
                <div className="text-sm">{hint}</div>
            </div>
            <div className="relative rounded shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {prefix}
                </div>
                <input
                    type="text"
                    name={name}
                    id={name}
                    className="block w-full rounded-md border-2 border-slate-300 py-1.5 pl-7 pr-20 placeholder:text-gray-400 dark:border-slate-600 dark:bg-slate-900 sm:text-sm  sm:leading-6"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    {suffix}
                </div>
            </div>
        </div>
    );
}

export function UITextarea({
    name,
    title,
    placeholder,
    defaultValue,
    hint,
    ...props
}: Readonly<
    {
        name: string;
        title: string;
        placeholder?: string;
        defaultValue?: string;
        hint?: string;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6"
                >
                    {title}
                </label>
                <div className="text-sm">{hint}</div>
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                    name={name}
                    id={name}
                    className="block min-h-[10rem] w-full rounded-md border-0 py-1.5 pl-7  pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
}
