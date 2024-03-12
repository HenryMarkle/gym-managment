import Link from "next/link";
import React from "react";

function HeaderDash() {
  const headerData = [
    { id: 1, title: "Home", to: "/panel/dashboard" },
    {
      id: 2,
      title: "Exercises ",
      to: "/panel/dashboard/exercises",
      active: false,
    },
    {
      id: 3,
      title: "Market ",
      to: "/panel/dashboard/market",
      active: false,
    },
    {
      id: 4,
      title: "Managers",
      to: "/panel/dashboard/managers",
      active: false,
    },
    {
      id: 5,
      title: "Exercises ",
      to: "/panel/dashboard/exercises",
      active: false,
    },
  ];
  return (
    <>
      <div className="header-dashboard flex items-center px-8 h-[50px] bg-green-600 mb-5 justify-around">
        {headerData.map((ele) => {
          return (
            <>
              <Link href={ele.to} className="font-bold text-white text-[20px]">
                {ele.title}
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}

export default HeaderDash;
