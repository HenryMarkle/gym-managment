"use client";

import React, { useEffect, useState } from "react";
import "./main.css";
import Link from "next/link";

import { getAllUsers } from "../../api/v1/user";

function page() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((c) => setAllUsers(c));
    console.log(allUsers);
  }, []);

  return (
    <>
      <div className="managers ml-[23%] m-4 min-h-[700px]  relative rounded-[31px] mt-20  gap-y-10  ">
        {allUsers.map((ele) => {
          return (
            <>
              <Link href={`/panel/maanger/${ele.id}`}>
                <div className="koch shadow-sm shadow-green-700  relative  h-[300px] p-2 mt-10 rounded-[31px]">
                  <img
                    className="h-[100px] rounded-full absolute -top-12 left-[50%] transform translate-x-[-50%] border-4 border-emerald-900 z-50 outline  outline-white outline-4"
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                    alt="trainer"
                  />
                  <div className="info pt-[70px] ">
                    <p className="text-center font-bold text-[19px]">
                      {ele.name}
                    </p>
                    <div className="other-info mt-4">
                      <p>
                        <span className="font-bold text-[17px]">Salary</span> :
                        {ele.salary} TL
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}

export default page;
