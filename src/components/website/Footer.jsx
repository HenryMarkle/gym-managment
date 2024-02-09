"use client";
import Link from "next/link";
import React from "react";

function Footer() {
  const data = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "Plans", to: "/plans" },
    { id: 3, title: "Market", to: "/market" },
    { id: 4, title: "Exercises", to: "/exercises" },
    { id: 6, title: "Contact", to: "/contact" },
    { id: 5, title: "About", to: "/about" },
  ];
  return (
    <div className="h-[350px] w-full bg-neutral-900 p-14 mt-28">
      <div className="maps grid grid-cols-2 gap-20">
        <div className="1 bg-red-100 flex justify-center items-center rounded-3xl">
          <p className="">Google maps</p>
        </div>
        <div className="2">
          <p className="text-white flex flex-col gap-5">
            {data.map((ele) => {
              return (
                <>
                  <Link
                    href={ele.to}
                    className="w-full text-white font-bold border-r-2 hover:text-website2 duration-300 hover:border-b-2 hover:pb-2 cursor-pointer hover:border-r-0 "
                  >
                    <span key={ele.id}>{ele.title}</span>
                  </Link>
                </>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
