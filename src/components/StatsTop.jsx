"use client";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { countCustomers, countCustomersWillEndIn, countExpiredCustomers } from "../app/api/v1/customer";
import { countUsers } from "../app/api/v1/user";

function Stats_top() {
  const [ allCustomers, setAllCustomers ] = useState(0);
  const [ endingCustomers, setEndingCustomers ] = useState(0);
  const [ expiredCustomers, setExpiredCustomers ] = useState(0);
  const [ allUsers, setAllUsers ] = useState(0);

  useEffect(() => {
    countCustomers().then(n => setAllCustomers(s));
    countUsers().then(n => setAllUsers(s));

    const d = new Date();

    countCustomersWillEndIn(d.setDate(d.getDate() + 7)).then(n => setEndingCustomers(n));
    countExpiredCustomers().then(n => setExpiredCustomers(n));
  }, []);


  return (
    <>
      <div className="stats flex gap-10 grid-cols-3">
        <div className="users-in0gym  p-5 bg-customRed w-[20%] text-[#ffcb00] rounded-[31px] overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Cureent Users
          </span>
          {/* <p className="h-[80%] w-[65%] bg-white rounded-[50%] flex items-center justify-center border-[10px] border-red-500  ">
                <span>20</span>
              </p> */}
          <span className="mt-4 text-[50px] font-bold text-customRed">
            <CountUp end={allCustomers} />
          </span>
        </div>
        <div className=" users-in0gym  p-5 bg-customRed w-[20%] rounded-3xl text-[#ffcb00] overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Cureent Managers
          </span>
          {/* <p className="h-[80%] w-[65%] bg-white rounded-[50%] flex items-center justify-center border-[10px] border-red-500  ">
                <span>20</span>
              </p> */}
          <span className="mt-4 text-[50px] font-bold text-customRed">
            {" "}
            <CountUp end={allUsers} />
          </span>
        </div>
        <div className=" users-in0gym  users-registers-end p-5 bg-customRed w-[20%] text-[#ffcb00] rounded-3xl overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Will end in 1 week
          </span>
          <span className="mt-4 text-[50px] font-bold text-customRed">
            {" "}
            <CountUp end={endingCustomers} />
          </span>
        </div>
        <div className=" users-in0gym  managers-in-gym p-5 bg-customRed text-[#ffcb00] w-[20%] rounded-3xl overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Ended Users
          </span>
          <span className="mt-4 text-[50px] font-bold text-customRed">
            <CountUp end={expiredCustomers} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Stats_top;
