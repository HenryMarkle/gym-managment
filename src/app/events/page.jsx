import React from "react";

function page() {
  return (
    <>
      <div className="events ml-[24%] mr-[50px] shadow-md mt-10 rounded-[31px] p-3 flex flex-col gap-8 ">
        <div className="added-event ml-2 flex justify-between items-center px-9 ">
          <div className="flex gap-2">
            <span className=" h-[25px] w-[25px] rounded-full bg-green-600 block"></span>
            <p>
              Added user (Ali haseni) <b>click to see user details</b>
            </p>
          </div>
          <div className="date">
            <span className=" font-bold">05-10-2023</span>
          </div>
        </div>
        <div className="removed-event ml-2 flex justify-between items-center px-9 ">
          <div className="flex gap-2">
            <span className=" h-[25px] w-[25px] rounded-full bg-red-600 block"></span>
            <p>
              Removed user (Ali haseni) <b>click to see user details</b>
            </p>
          </div>
          <div className="date">
            <span className=" font-bold">05-10-2023</span>
          </div>
        </div>
        <div className="update-event ml-2 flex justify-between items-center px-9 ">
          <div className="flex gap-2">
            <span className=" h-[25px] w-[25px] rounded-full bg-orange-400 block"></span>
            <p>
              Added user (Ali haseni) <b>click to see user details</b>
            </p>
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
