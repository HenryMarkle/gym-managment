"use client";
import React from "react";
import CountUp from "react-countup";
function Stats_top() {
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
            <CountUp end={100} />
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
            <CountUp end={28} />
          </span>
        </div>
        <div className=" users-in0gym  users-registers-end p-5 bg-customRed w-[20%] text-[#ffcb00] rounded-3xl overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Will end in 1 week
          </span>
          <span className="mt-4 text-[50px] font-bold text-customRed">
            {" "}
            <CountUp end={70} />
          </span>
        </div>
        <div className=" users-in0gym  managers-in-gym p-5 bg-customRed text-[#ffcb00] w-[20%] rounded-3xl overflow-hidden shadow-md text-center flex flex-col items-center">
          <span className=" opacity-90 mb-1 text-white font-bold">
            Ended Users
          </span>
          <span className="mt-4 text-[50px] font-bold text-customRed">
            <CountUp end={60} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Stats_top;
