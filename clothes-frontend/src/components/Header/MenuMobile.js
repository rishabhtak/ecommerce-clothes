import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Men's", cat: "men", subMenu: true },
  { id: 3, name: "Women's", cat: "women", subMenu: true },
  { id: 4, name: "About", url: "/" },
  { id: 5, name: "Contact", url: "/" },
];

const subMenuData = [
  { id: 1, name: "Shirt", doc_count: 11 },
  { id: 2, name: "T-Shirt", doc_count: 8 },
  { id: 3, name: "Jeans", doc_count: 64 },
  { id: 4, name: "Trousers", doc_count: 107 },
];

const MenuMobile = ({
  showMenCat,
  showWomenCat,
  setShowMenCat,
  setShowWomenCat,
  setMobileMenu,
}) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              item.cat === "men" ? (
                <li
                  className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                  onClick={() => setShowMenCat(!showMenCat)}
                >
                  <div className="flex justify-between items-center">
                    {item.name}
                    <BsChevronDown size={14} />
                  </div>

                  {showMenCat && (
                    <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                      {subMenuData.map((submenu) => {
                        return (
                          <Link
                            key={submenu.id}
                            href="/"
                            onClick={() => {
                              setShowMenCat(false);
                              setMobileMenu(false);
                            }}
                          >
                            <li className="py-4 px-8 border-t flex justify-between">
                              {submenu.name}
                              <span className="opacity-50 text-sm">
                                {submenu.doc_count}
                              </span>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ) : (
                <li
                  className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                  onClick={() => setShowWomenCat(!showWomenCat)}
                >
                  <div className="flex justify-between items-center">
                    {item.name}
                    <BsChevronDown size={14} />
                  </div>

                  {showWomenCat && (
                    <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                      {subMenuData.map((submenu) => {
                        return (
                          <Link
                            key={submenu.id}
                            href="/"
                            onClick={() => {
                              setShowWomenCat(false);
                              setMobileMenu(false);
                            }}
                          >
                            <li className="py-4 px-8 border-t flex justify-between">
                              {submenu.name}
                              <span className="opacity-50 text-sm">
                                {submenu.doc_count}
                              </span>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </li>
              )
            ) : (
              <li className="py-4 px-5 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
