import React from "react";

export enum ButtonType {
    link = "link",
    default = "default"
}

export default function UIButton({
    title,
    buttonType,
    ...props
}: Readonly<
    {
        title: string;
        buttonType: ButtonType;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>
>) {
    switch (buttonType) {
        case ButtonType.link:
            return (
                <button
                    className={
                        "mx-auto inline-block rounded px-4 py-2 text-center text-gray-900 hover:text-indigo-900 dark:text-gray-200 dark:hover:text-indigo-200 " +
                        props.className
                    }
                    {...props}
                >
                    {title}
                </button>
            );
        case ButtonType.default:
            return (
                <button
                    className={
                        "mx-auto block rounded border-2 border-slate-900 px-8 py-2 text-center dark:border-slate-100 " +
                        props.className
                    }
                    {...props}
                >
                    {title}
                </button>
            );
    }
}
