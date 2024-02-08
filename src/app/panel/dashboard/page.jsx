"use client";
import React, { useEffect, useState } from "react";
import { HomePage } from "../../../components/dashboard/HomePage";
import { ContactPage } from "../../../components/dashboard/ContactPage";
function page() {
  const [active, setActive] = useState(["1"]);

  const tabs = [
    { id: "1", title: "Home page" },
    { id: "2", title: "Contact page" },
    { id: "3", title: "Managers page" },
    { id: "4", title: "shop page" },
    { id: "5", title: "workouts page" },
    { id: "6", title: " products " },
    { id: "7", title: " plans " },
  ];

  const components = [
    {
      id: `1`,
      component: <HomePage />,
    },
    {
      id: `2`,
      component: <ContactPage />,
    },
    {
      id: `3`,
      component: "ShopPage",
    },
    {
      id: `4`,
      component: "ManagersPage",
    },
    {
      id: `5`,
      component: "WorkoutsPage",
    },
  ];

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div className="ml-[25%] h-auto mt-5 shadow-md mr-6  p-2 rounded-[31px]">
      <div className="tabs flex justify-between m-4 border-b-2 pb-4 flex-wrap">
        {tabs.map((e) => {
          return (
            <>
              <div
                onClick={() => {
                  setActive([e.id]);
                }}
                id={e.id}
                className={
                  active.includes(e.id)
                    ? "tab1 bg-customRed min-w-[140px] px-2 py-4 text-white duration-300 cursor-pointer rounded-lg"
                    : "tab1 bg-green-200 min-w-[140px] px-2 py-4 text-white duration-300 cursor-pointer   rounded-lg"
                }
              >
                {e.title}
              </div>
            </>
          );
        })}
      </div>

      {components.map((e) => {
        return <>{active.includes(e.id) ? e.component : null}</>;
      })}
    </div>
  );
}

export default page;
