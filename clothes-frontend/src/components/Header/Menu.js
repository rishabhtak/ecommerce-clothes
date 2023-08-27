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

const subMenuMenData = [
  { id: 1, name: "Shirts", doc_count: 11, url: "/men-clothing/shirts" },
  { id: 2, name: "T-Shirt", doc_count: 8, url: "/men-clothing/tshirt" },
  { id: 3, name: "Jeans", doc_count: 64, url: "/men-clothing/jeans" },
  { id: 4, name: "Trousers", doc_count: 107, url: "/men-clothing/trousers" },
];

const subMenuWomenData = [
  { id: 1, name: "Tops", doc_count: 11, url: "/women-clothing/tops" },
  { id: 2, name: "T-Shirt", doc_count: 8, url: "/women-clothing/tshirt" },
  { id: 3, name: "Jeans", doc_count: 64, url: "/women-clothing/jeans" },
  { id: 4, name: "Trousers", doc_count: 107, url: "/women-clothing/trousers" },
];

const Menu = ({ showMenCat, showWomenCat, setShowMenCat, setShowWomenCat }) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              item.cat === "men" ? (
                <li
                  className="cursor-pointer flex items-center gap-2 relative transition ease-in-out delay-150 hover:text-blue-400 duration-300"
                  onMouseEnter={() => setShowMenCat(true)}
                  onMouseLeave={() => setShowMenCat(false)}
                >
                  {item.name}
                  <BsChevronDown size={14} />
                  {showMenCat && (
                    <ul className="bg-white absolute top-6 left-0 min-w-[250px] text-black shadow-lg">
                      {subMenuMenData.map((submenu) => {
                        return (
                          <Link
                            key={submenu.id}
                            href={submenu.url}
                            onClick={() => setShowMenCat(false)}
                          >
                            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] border-b">
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
                  className="cursor-pointer flex items-center gap-2 relative transition ease-in-out delay-150 hover:text-blue-400 duration-300"
                  onMouseEnter={() => setShowWomenCat(true)}
                  onMouseLeave={() => setShowWomenCat(false)}
                >
                  {item.name}
                  <BsChevronDown size={14} />
                  {showWomenCat && (
                    <ul className="bg-white absolute top-6 left-0 min-w-[250px] text-black shadow-lg">
                      {subMenuWomenData.map((submenu) => {
                        return (
                          <Link
                            key={submenu.id}
                            href={submenu.url}
                            onClick={() => setShowWomenCat(false)}
                          >
                            <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] border-b">
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
              <li className="cursor-pointer transition ease-in-out delay-150 hover:text-blue-400 duration-300">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
