"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  _selected,
  all,
  name,
}: {
  _selected: Bundleable;
  all: Bundleable[];
  name: string;
}) {
  const [selected, setSelected] = useState(_selected);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <input type="hidden" name={name} value={selected.publicId} />
          <Listbox.Label className="block text-sm font-medium leading-6 ">
            Selected:{" "}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-slate-900">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.title}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-slate-900">
                {all.map((bundle) => (
                  <Listbox.Option
                    key={bundle.publicId}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={bundle}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate",
                            )}
                          >
                            {bundle.title}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
