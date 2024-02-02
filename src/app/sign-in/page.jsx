"use client";
import Link from "next/link";
import { useState } from "react";
import { doSignin } from "../api/v1/auth";
import RootLayout from "../layout";
function page() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  async function signin() {
    const result = await doSignin(email, password);
    console.log("sign-in: "+result)
  }
  return (
    <>
      <RootLayout showSidebar={false}>
        <div className="sign-in parent h-[100vh]  absolute w-full">
          <div className="form h-[400px] w-[350px] bg-white shadow-lg mx-auto my-0 mt-[150px] p-2 rounded-[31px] flex flex-col justify-around">
            <div className="items flex flex-col gap-8 items-center">
              <p className=" text-center font-bold text-[22px]">Login</p>
              <input
                className="p-2 shadow-xl rounded-xl w-[85%] hover:scale-[1.03] duration-200 hover:shadow-xl"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass w-[85%]">
                <input
                  className="p-2 shadow-xl rounded-xl w-full hover:scale-[1.03] duration-200 hover:shadow-xl"
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={signin}
                className=" bg-customRed text-white py-2 px-9 my-0 mx-auto rounded-3xl  shadow-xl "
              >
                Login
              </button>
            </div>
            <div className="dont">
              <p>
                don`t have account ?{" "}
                <Link href="/sign-up">
                  <span className=" text-orange-600 font-bold">
                    Create-account
                  </span>
                </Link>
              </p>
              <Link href="/forgetPassword">
                <p className="mt-3 text-customRed">forget password ? </p>
              </Link>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}

export default page;
