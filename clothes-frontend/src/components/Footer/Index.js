"use client";
import Image from "next/image";
import Wrapper from "../Wrapper/Index";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa6";

const footerNavs = [
  {
    label: "Shopping & Categories",
    items: [
      {
        href: "/",
        name: "Partners",
      },
      {
        href: "/",
        name: "Blog",
      },
      {
        href: "/",
        name: "Team",
      },
      {
        href: "/",
        name: "Careers",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        href: "/",
        name: "contact",
      },
      {
        href: "/",
        name: "Support",
      },
      {
        href: "/",
        name: "Docs",
      },
      {
        href: "/",
        name: "Pricing",
      },
    ],
  },
  {
    label: "About",
    items: [
      {
        href: "/",
        name: "Terms",
      },
      {
        href: "/",
        name: "License",
      },
      {
        href: "/",
        name: "Privacy",
      },
      {
        href: "/",
        name: "About US",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="text-gray-500 px-4 py-5 mx-auto md:px-8 bg-[#f4f4f4]">
      <Wrapper>
        <div className="gap-6 justify-between md:flex">
          <div className="flex-1">
            <div className="max-w-xs">
              <Image
                src="/logo.png"
                alt="logo"
                width={195}
                height={59}
                className="w-32"
              />
              <p className="leading-relaxed mt-2 text-[15px]">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="block pt-4 pb-2">
                Subscribe To Get New Offers
              </label>
              <div className="max-w-sm flex items-center border rounded-md p-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-5 transition ease-in-out hover:bg-sky-500 duration-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
            {footerNavs.map((item, idx) => (
              <ul className="space-y-4" key={idx}>
                <h4 className="text-gray-800 font-medium">{item.label}</h4>
                {item.items.map((el, idx) => (
                  <li key={idx}>
                    <a href={el.href} className="hover:text-indigo-600">
                      {el.name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
          <div className="mt-4 sm:mt-0">&copy; 2023 All rights reserved.</div>
          <div className="mt-6 sm:mt-0">
            <ul className="flex items-center space-x-4">
              <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                <a href="/">
                  <FaFacebookF color="blue" />
                </a>
              </li>

              <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                <a href="/">
                  <FaPinterest color="blue" />
                </a>
              </li>

              <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                <a href="/">
                  <FaTwitter color="blue" />
                </a>
              </li>

              <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                <a href="/">
                  <FaInstagram color="blue" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
