import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div className="sign-in">
        <div className="form h-[400px] w-[350px] bg-white shadow-lg mx-auto my-0 mt-[150px] p-2 rounded-2xl flex flex-col justify-around">
          <div className="items flex flex-col gap-8 items-center">
            <p className=" text-center font-bold text-[22px]">Login</p>
            <input
              className="p-2 shadow-xl rounded-xl w-[85%]"
              type="text"
              placeholder="email"
            />
            <div className="pass w-[85%]">
              <input
                className="p-2 shadow-xl rounded-xl w-full"
                type="text"
                placeholder="password"
              />
            </div>
            <button className=" bg-customRed text-white py-2 px-9 my-0 mx-auto rounded-3xl  shadow-xl ">
              Login
            </button>
          </div>
          <div className="dont">
            <p>
              don`t have account ?{" "}
              <Link href="/sign-up">
                <span className=" text-customRed">Create-account</span>
              </Link>
            </p>
            <Link href="/forgetPassword">
              <p className="mt-3 text-customRed">forget password ? </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
