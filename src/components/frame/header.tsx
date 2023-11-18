"use client";

import Logo from "../logo";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { UserRole } from "@/app/user/usermodel";

const navigation = [
  { name: "Recipes", href: "/recipe" },
  { name: "Ingredients", href: "/ingredients" },
  { name: "Tools", href: "/tools" },
];
export default function Header({
  userRole,
  userName,
}: {
  userRole: UserRole;
  userName: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let userLink;
  switch (userRole) {
    case UserRole.NotSignedIn:
      userLink = (
        <Link
          href="/user/signin"
          className="font-semibold leading-6"
          aria-label="header-nav-lg:menu-loginlink"
        >
          登录 <span aria-hidden="true">&rarr;</span>
        </Link>
      );
      break;
    default:
      userLink = (
        <div>
          欢迎{" "}
          <Link
            href="/user/profile"
            className="font-semibold leading-6"
            aria-label="header-nav-lg:menu-loginlink"
          >
            {userName}
          </Link>
        </div>
      );
  }

  return (
    /*
            [HEADER SECTION]

            Base header for main layouts.
        */
    <header
      className="absolute inset-x-0 top-0 z-50 bg-white px-16 py-4 shadow-sm shadow-slate-200 dark:bg-slate-800 dark:shadow-slate-600"
      aria-label="header"
    >
      <nav
        className="flex items-center justify-between"
        aria-label="header-nav"
      >
        {/*
                    The brand of the header section.

                    Should always be shown.
                */}
        <div className="flex lg:flex-1">
          <Logo size={"xl"} />
        </div>
        {/*
                    A Link of a menu icon points to open the mobile size menu.

                    Clicking it will trigger dialog's opening.
                    Should only be shown on small screen size.
                */}
        <div className="flex lg:hidden" aria-label="header-nav-sm:menu-button">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {/*
                    Section links to be shown in the header.

                    Section links are generated from the [navigation] array at the top of the file.
                    Should only be shown on large screen size.
                */}
        <div
          className="hidden lg:flex lg:gap-x-12"
          aria-label="header-nav-lg:menu"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-semibold leading-6"
              aria-label="header-nav-lg:menu-sectionlink"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userLink}
        </div>
      </nav>

      {/*
                The dialog below defines the mobile menu.

                Mobile size menu is shown when the menu icon is clicked.
                The [open] state is defined by the [mobileMenuOpen] variable, and can be toggled by [setMobileMenuOpen].
                Should only be shown on small screen size.
            */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        aria-label="header-nav-sm:menu"
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/*
                            The brand of the dialog menu.
                        */}
            <Logo size={"xl"} />
            {/*
                            The close button to be shown in the dialog menu.

                            Clicking the close button will close the dialog menu by triggering `setMobileMenuOpen` method.
                        */}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="header-nav-sm:menu-closebutton"
            >
              <span className="sr-only">Close menu</span>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-800"
                    aria-label="header-nav-sm:menu-sectionlink"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/*
                                Relevant information of user signed in.

                                Shows a signin link when not signed in, points to an individual page.
                                Shows user's avatar & name when signed in, and the link points to the user's profile page.
                            */}
              <div className="py-6">{userLink}</div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
