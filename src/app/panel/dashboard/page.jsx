"use client";
import React, { useEffect, useState } from "react";
import { CiCircleChevDown } from "react-icons/ci";

import { HomePage } from "../../../components/dashboard/HomePage";
import { ContactPage } from "../../../components/dashboard/ContactPage";
import Exercises from "../../../components/dashboard/Exercises.jsx";
import "./dashboard.css";
function page() {
  const [active, setActive] = useState(["1"]);

  const tabs = [
    { id: "1", title: "Home" },
    { id: "2", title: "Exercises" },
    { id: "3", title: "products" },
    { id: "4", title: "Managers" },
    { id: "5", title: "plans" },
    { id: "6", title: "Contact" },
  ];

  const components = [
    {
      id: `1`,
      component: <HomePage />,
    },
    {
      id: `6`,
      component: <ContactPage />,
    },
    {
      id: `2`,
      component: <Exercises />,
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

  const [openSelects, setOpenSelects] = useState([]);

  return (
    <div className=" h-auto mt-5 shadow-md mr-6  p-4 rounded-[31px]">
      <div className="tabs flex justify-between m-4 border-b-2 pb-8 flex-wrap">
        {tabs.map((e) => {
          return (
            <>
              <div
                onClick={() => {
                  setActive([e.id]);
                }}
                id={e.id}
                className={` shadow-md w-[12%] px-2 py-4 h-[55px] rounded-md cursor-pointer ${
                  active.includes(e.id) && "text-green-600"
                } `}
              >
                <div className="flex items-center w-full justify-between">
                  <span className="font-bold ">{e.title}</span>
                  <span>
                    <CiCircleChevDown size="21px" />
                  </span>
                </div>
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
