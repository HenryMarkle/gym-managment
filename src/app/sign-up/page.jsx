import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div className="parent h-[100vh] w-full absolute">
        <div className="form shadow-2xl h-[460px] w-[370px] my-[100px] mx-auto p-4 rounded-2xl flex flex-col justify-between z-2 bg-white">
          <div className="items mt-8 flex flex-col gap-9">
            <p className=" text-center text-[20px] font-bold">Create Account</p>
            <input
              className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
              type="text"
              placeholder="email"
            />
            <input
              className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
              type="password"
              placeholder="password"
            />
            <input
              className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
              type="password"
              placeholder="confirm password"
            />
            <button className=" bg-customRed text-white py-2 px-9 my-0 mx-auto rounded-3xl  shadow-xl ">
              Create
            </button>
          </div>
          <div>
            <p className=" text-[14px]  text-black">
              Already have an account ?{" "}
              <Link href="/sign-in" className=" text-customRed">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
