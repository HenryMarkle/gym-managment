"use client";
import React, { useEffect, useState } from "react";
import "./managers.css";
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
      <div className="managers ml-[17%] min-h-[100vh] bg-bg_custom relative pt-10 px-16">
        {allUsers?.map((ele) => {
          return (
            <Link key={ele.id} href={`/panel/maanger/${ele.id}`}>
              <div className=" flex flex-col justify-between rounded-md  bg-white h-[300px]">
                <div className="  ">
                  <div className="flex flex-col mt-[32px] items-center">
                    <img
                      className="h-[85px] w-[85px] rounded-full"
                      src="https://www.bostonmagazine.com/wp-content/uploads/sites/2/2021/06/be-a-man-guy-t.jpg"
                      alt=""
                    />
                    <div className="">
                      <div className=" ">
                        <p className="text-center font-bold text-[19px] mt-2">
                          {ele.name}
                        </p>
                        <p className="text-center mt-3 text-[16px] opacity-70">
                          {ele.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="salary rounded-md bg-[#f3931431] py-1 m-3 ">
                  <div className="w-full flex flex-col  items-center">
                    <span className="font-bold text-[14px]">Salary</span>
                    <span className="font-bold text-xl text-txt_secondery">
                      {ele.salary} TL
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default page;
