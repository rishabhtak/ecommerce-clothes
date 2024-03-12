"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState("hidden");
  const [hideButton, setHideButton] = useState("block");
  return (
    <div>
      <button
        onClick={() => {
          setShowMenu("block");
          setHideButton("hidden");
        }}
        className={`${hideButton} md:hidden float-right pr-4`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className={`${showMenu} md:block fixed w-full md:w-64 z-10`}>
        <div className="flex flex-col h-screen">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-700 border-r">
            <div className="flex flex-col items-center flex-shrink-0 px-4">
              <Link className="px-8 text-left focus:outline-none" href="/">
                <h2 className="block p-2 text-xl font-medium tracking-tighter text-white transition duration-500 ease-in-out transform cursor-pointer hover:text-white">
                  Admin Panel
                </h2>
              </Link>
              <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col flex-grow px-4 mt-5">
              <nav className="flex-1 space-y-1 bg-indigo-700">
                <ul>
                  <li>
                    <Link
                      className={`inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline ${
                        pathname === "/"
                          ? "bg-indigo-600"
                          : "hover:bg-indigo-600"
                      }`}
                      href="/"
                      onClick={() => {
                        setShowMenu("hidden");
                        setHideButton("block");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        />
                      </svg>
                      <span className="ml-4">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline ${
                        pathname === "/products" ||
                        pathname === "/products/addproduct"
                          ? "bg-indigo-600"
                          : "hover:bg-indigo-600"
                      }`}
                      href="/products"
                      onClick={() => {
                        setShowMenu("hidden");
                        setHideButton("block");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span className="ml-4">Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline ${
                        pathname === "/users"
                          ? "bg-indigo-600"
                          : "hover:bg-indigo-600"
                      }`}
                      href="/users"
                      onClick={() => {
                        setShowMenu("hidden");
                        setHideButton("block");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="ml-4">Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline ${
                        pathname === "/orders"
                          ? "bg-indigo-600"
                          : "hover:bg-indigo-600"
                      }`}
                      href="/orders"
                      onClick={() => {
                        setShowMenu("hidden");
                        setHideButton("block");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="ml-4">Orders</span>
                    </Link>
                  </li>
                  <li>
                    <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-indigo-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>

                      <button
                        onClick={() => signOut("google")}
                        className="ml-4"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-shrink-0 p-4 px-4 bg-indigo-600">
              <Link href="/" className="flex-shrink-0 block w-full group">
                <div className="flex items-center">
                  <div className="text-white">Logo</div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      Ecommerce Clothes
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
