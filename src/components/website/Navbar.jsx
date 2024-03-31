"use client";
import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";

import Link from "next/link";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log(scrollPosition);
  }, [scrollPosition]);

  const headerStyle =
    scrollPosition < 735 ? { backgroundColor: "rgba(250,250,250,0.1)" } : {};

  const headerData = [
    { id: 1, title: "Home", to: "/" },
    { id: 3, title: "Plans", to: "/plans" },
    { id: 4, title: "Market", to: "/market" },
    { id: 5, title: "Exercises", to: "/exercises" },
    { id: 6, title: "About", to: "/about" },
    { id: 7, title: "Contact", to: "/contact" },
  ];
  return (
    <div className="flex flex-1 justify-between ">
      {headerData.map((ele) => {
        return (
          <React.Fragment key={ele.id}>
            <Link href={ele.to}>
              <span
                className={
                  scrollPosition > 735
                    ? "text-lg font-bold text-black  cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
                    : "text-lg font-bold text-white  cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
                }
              >
                {ele.title}
              </span>
            </Link>
          </React.Fragment>
        );
      })}
      <Link href="/basket">
        <div className="basket flex items-center cursor-pointer">
          <SlBasket
            size={27}
            fontWeight={40}
            color="#e75f11"
            className=" font-extrabold"
          />
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
