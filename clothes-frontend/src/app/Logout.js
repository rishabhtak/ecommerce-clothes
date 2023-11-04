"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

export default function Logout() {
  const userNavigation = [
    { name: "My Orders", href: "/profile/orders" },
    { name: "Settings", href: "/profile/settings" },
    { name: "Sign out", href: "#", signOut: () => signOut() },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
          <span className="absolute -inset-1.5" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            className="w-7 h-7 bg-white rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  onClick={item?.signOut}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
