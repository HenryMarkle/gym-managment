"use client";
import React, { useEffect, useState } from "react";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  //   Start scrool Value

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
    console.log(scrollPosition);
  }, [scrollPosition]);

  const headerStyle =
    scrollPosition < 735 ? { backgroundColor: "rgba(250,250,250,0.1)" } : {};

  //   End scrool Value

  const headerData = [
    { id: 1, title: "Home" },
    { id: 2, title: "About" },
    { id: 3, title: "Plans" },
    { id: 4, title: "Shop" },
    { id: 5, title: "Contact" },
  ];

  return (
    <>
      <div className="header-parent h-[100vh] bg-emerald-200">
        <div
          style={headerStyle}
          className={`header-bar w-full h-20 z-[100] justify-between px-[290px] duration-700 flex items-center ${
            scrollPosition > 735 && "bg-white shadow-lg fixed"
          }`}
        >
          <p
            className={
              scrollPosition > 735
                ? "text-5xl text-black font-extrabold w-[500px] "
                : "text-5xl text-white font-extrabold w-[500px] "
            }
          >
            <span>Gym</span> <span className="text-website2">Title</span>
          </p>
          <div className="flex flex-1 justify-between ">
            {headerData.map((ele) => {
              return (
                <>
                  <span
                    key={ele.id}
                    className={
                      scrollPosition > 735
                        ? "text-lg font-bold text-black  cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
                        : "text-lg font-bold text-white  cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
                    }
                  >
                    {ele.title}
                  </span>
                </>
              );
            })}
          </div>
        </div>
        <div className="content flex items-center justify-center h-full ">
          <div className="mb-40 text-center">
            <p className="text-center mb-2 font-bold text-2xl text-white">
              WORK HARDER, GET STRONGER
            </p>
            <p className="text-center text-7xl font-extrabold text-white">
              EASY WITH OUR <span className="text-website2">GYM</span>
            </p>
            <button className="mt-5 bg-[#ed563b] text-white px-4 text-xl py-4 rounded-sm">
              BECOME A MEMBER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
