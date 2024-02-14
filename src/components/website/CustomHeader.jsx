"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";
import { SlBasket } from "react-icons/sl";

function CustomNav() {
  const [gymName, setGymName] = useState([]);

  useEffect(() => {
    getHomeGeneralInfo().then((i) => {
      if (i === "error" || i === "unauthorized") {
        console.log("first");
      } else {
        // setGenInfo(i);
        const words = i.title.split(" ");
        console.log(words[1]);
        setGymName(words);
      }
    });
  }, []);

  const headerData = [
    { id: 1, title: "Home", to: "/" },
    { id: 3, title: "Plans", to: "/plans" },
    { id: 4, title: "Market", to: "/market" },
    { id: 5, title: "Exercises", to: "/exercises" },
    { id: 2, title: "About", to: "/about" },
    { id: 6, title: "Contact", to: "/contact" },
  ];

  return (
    <div className="custom-header flex flex-1 justify-between shadow-xl  h-[60px] items-center px-[200px] py-10">
      <div className="w-[30%]">
        <Link href="/">
          <span className="text-4xl font-bold">
            {gymName[0]} <span className="text-website2">{gymName[1]}</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-1 justify-evenly">
        {headerData.map((ele) => (
          <Link key={ele.id} href={ele.to}>
            <span
              className={
                "text-lg font-bold text-black cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
              }
            >
              {ele.title}
            </span>
          </Link>
        ))}
      </div>
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

export default CustomNav;
