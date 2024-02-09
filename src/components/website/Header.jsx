"use client";
import React, { useEffect, useState } from "react";
import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";
import { getGymName } from "../../app/api/v1/user";
import Navbar from "./Navbar";
import Link from "next/link";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [gymName, setGymName] = useState([]);
  const [genInfo, setGenInfo] = useState(null);

  //   Start scrool Value

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    getHomeGeneralInfo().then((i) => {
      if (i === "error" || i === "unauthorized") {
        console.log("first");
      } else {
        setGenInfo(i);
        const words = i.title.split(" ");
        console.log(words[0]);
        setGymName(words);
      }
    });

    getGymName().then((name) => {
      if (name === "unauthorized" || name === null);
      else setGymName(name);
    });

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

  return (
    <>
      <div className="header-parent h-[100vh] bg-emerald-200 z-50">
        <div
          style={headerStyle}
          className={`header-bar w-full h-20 z-[100] justify-between px-[290px] duration-700 flex items-center  ${
            scrollPosition > 735 && "bg-white shadow-lg fixed z-50"
          }`}
        >
          <p
            className={
              scrollPosition > 735
                ? "text-5xl text-black font-extrabold w-[500px] "
                : "text-5xl text-white font-extrabold w-[500px] "
            }
          >
            <span>
              {gymName[0]} <span className="text-website2">{gymName[1]}</span>
            </span>

            {/* <span className="text-website2">{genInfo?.title ?? ""}</span> */}
          </p>
          <Navbar />
        </div>
        <div className="content flex items-center justify-center h-full ">
          <div className="mb-40 text-center">
            <p className="text-center mb-2 font-bold text-2xl text-white">
              {genInfo?.sentence ?? ""}
            </p>
            <p className="text-center text-7xl font-extrabold text-white">
              {genInfo?.secondSentence ?? ''}
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
