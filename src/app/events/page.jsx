"use client";
import React from "react";

function page() {
  return (
    <>
      <div className="events ml-[24%] mr-[50px] shadow-md mt-10 rounded-[31px] p-3 flex flex-col  ">
        <div className="added-event ml-2 flex justify-between items-center px-4  border-b-2 py-4">
          <div className=" event-info  flex gap-2 flex-1 mx-4">
            <span className=" h-[25px] w-[25px] rounded-full bg-green-600 block"></span>
            <div className=" flex justify-between w-full">
              <p className=" details-about-user">Added user (Ali haseni)</p>
              <span className="details bg-green-600 cursor-pointer px-3 py-1 rounded-2xl text-white">
                details
              </span>
            </div>
          </div>
          <div className="date">
            <span className=" font-bold">05-10-2023</span>
          </div>
        </div>
        <div className="removed-event ml-2 flex justify-between items-center px-4  border-b-2  py-4">
          <div className="event-info flex gap-2 flex-1 mx-4">
            <span className=" h-[25px] w-[25px] rounded-full bg-red-600 block"></span>
            <div className=" flex justify-between w-full">
              <p className="details-about-user">removed user (Ali haseni)</p>
              <span className="details bg-green-600 cursor-pointer px-3 py-1 rounded-2xl text-white">
                details
              </span>
            </div>
          </div>
          <div className="date">
            <span className=" font-bold">05-10-2023</span>
          </div>
        </div>
        <div className="updated-event ml-2 flex justify-between items-center px-4 py-4">
          <div className=" event-info flex gap-2 flex-1 mx-4">
            <span className=" h-[25px] w-[25px] rounded-full bg-orange-600 block"></span>
            <div className=" flex justify-between w-full">
              <p className=" details-about-user">updated user (Ali haseni)</p>
              <span className="details bg-green-600 cursor-pointer px-3 py-1 rounded-2xl text-white">
                details
              </span>
            </div>
          </div>
          <div className="date">
            <span className=" font-bold">05-10-2023</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
