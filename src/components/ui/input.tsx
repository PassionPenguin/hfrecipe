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
}

export function UIInput({
  type,
  name,
  title,
  hint,
  prefix,
  suffix,
  ...props
}: Readonly<
  {
    type: InputType;
    name: string;
    title: string;
    hint?: string;
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
  } & React.InputHTMLAttributes<HTMLInputElement>
>) {
  if (type === InputType.hidden) {
    return <input type={type} name={name} value={props.value} readOnly />;
  } else if (type === InputType.submit) {
    return (
      <button
        type={type}
        name={name}
        className="text-center block mx-auto py-2 px-8 rounded border-2 border-slate-900 dark:border-slate-100"
      >
        {title}
      </button>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-sm font-medium leading-6">
          {title}
        </label>
        <div className="text-sm">{hint}</div>
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {prefix}
        </div>
        <input
          type="text"
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:bg-slate-900"
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
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
        <label htmlFor={name} className="block text-sm font-medium leading-6">
          {title}
        </label>
        <div className="text-sm">{hint}</div>
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <textarea
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-900"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
