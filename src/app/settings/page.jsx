"use client";
import React, { useState } from "react";

function page() {
  const [oldPass, setOldPassword] = useState();
  const [newPass, setNewPassword] = useState();
  const [confirm, setconfirmPassword] = useState();
  const [name, setrName] = useState();
  const [theme1, setTheme1] = useState(true);
  const [theme2, setTheme2] = useState(false);
  return (
    <>
      <div className="settings ml-[23%] mt-5  mr-4 p-4 rounded-lg gap-10">
        <div>
          <div className="card h-full min-h-[300px] bg-white shadow-xl rounded-xl flex flex-col justify-around gap-10 p-5">
            <p className=" font-bold  text-center">General settings</p>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
              type="text"
              placeholder="old password"
            />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
              type="text"
              placeholder="new password"
            />
            <input
              onChange={(e) => setconfirmPassword(e.target.value)}
              className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
              type="text"
              placeholder="confirm password"
            />
            <button
              disabled
              className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="card h-[200px] bg-white shadow-xl  rounded-xl flex flex-col gap-5 p-3 justify-between mb-2">
            <p className=" font-bold  text-center">Change Gym name</p>
            <input
              onChange={(e) => setrName(e.target.value)}
              className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
              type="text"
              placeholder="new name"
            />
            <button
              disabled
              className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer"
            >
              Submit
            </button>
          </div>{" "}
          <div className="card h-[200px] bg-white shadow-xl rounded-xl flex flex-col justify-between gap-5 p-3">
            <p className=" font-bold  text-center">Change manager name</p>
            <input
              onChange={(e) => setrName(e.target.value)}
              className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
              type="text"
              placeholder="new name"
            />
            <button
              disabled
              className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Start themes */}
      {/* Start themes */}
      {/* Start themes */}
      {/* Start themes */}

      <div className="themes  ml-[24%]  mt-5  mr-4 p-4 rounded-lg shadow-xl ">
        <p className=" font-bold text-center mb-8">Themes</p>

        <div className="themes flex flex-wrap gap-6 justify-center">
          {/* Theme 1 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
          {/* Theme 2 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
          {/* Theme 3 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
          {/* Theme 4 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
          {/* Theme 5 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
          {/* Theme 6 */}
          <div
            className={
              "theme cursor-pointer w-[45%] bg-white text-center h-[300px] rounded-lg border-4 duration-500  border-[#098b2a] p-3 relative "
            }
          >
            <div className="first h-[70%] ml-[50px] rounded-2xl  bg-customRed w-[50%] relative z-[1000]"></div>
            <div className="first h-[64%] ml-[50px] rounded-2xl bg-white shadow-xl w-[50%] top-[30%] absolute left-[28%] z-[2]"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
