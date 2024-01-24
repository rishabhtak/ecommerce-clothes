"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import Image from "next/image";
import Wrapper from "../Wrapper/Index";
import ProfileMenu from "@/components/ProfileMenu";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { CartContext } from "../CartContextProvider";

const Header = () => {
  const { cartProducts, session } = useContext(CartContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMenCat, setShowMenCat] = useState(false);
  const [showWomenCat, setShowWomenCat] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const subMenuMenData = [
    { id: 1, name: "Shirt", url: "/men/shirt" },
    { id: 2, name: "T-Shirt", url: "/men/tshirt" },
    { id: 3, name: "Jeans", url: "/men/jeans" },
    { id: 4, name: "Trouser", url: "/men/trouser" },
  ];

  const subMenuWomenData = [
    { id: 1, name: "Tops", url: "/women/tops" },
    { id: 2, name: "Shirt", url: "/women/shirt" },
    { id: 3, name: "Jeans", url: "/women/jeans" },
    { id: 4, name: "Trouser", url: "/women/trouser" },
  ];

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, controlNavbar]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <div>Logo</div>
        </Link>

        <Menu
          showMenCat={showMenCat}
          setShowMenCat={setShowMenCat}
          showWomenCat={showWomenCat}
          setShowWomenCat={setShowWomenCat}
          subMenuMenData={subMenuMenData}
          subMenuWomenData={subMenuWomenData}
        />

        {mobileMenu && (
          <MenuMobile
            showMenCat={showMenCat}
            setShowMenCat={setShowMenCat}
            showWomenCat={showWomenCat}
            setShowWomenCat={setShowWomenCat}
            setMobileMenu={setMobileMenu}
            subMenuMenData={subMenuMenData}
            subMenuWomenData={subMenuWomenData}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          {!!session && <ProfileMenu />}
          {!session && (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
          {/* Icon end */}

          {/* Icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {cartProducts.length}
              </div>
            </div>
          </Link>
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
