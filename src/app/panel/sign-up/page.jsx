"use client";
import Link from "next/link";
import React, { useState } from "react";
import RootLayout from "../../layout";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  return (
    <>
      <RootLayout showSidebar={false}>
        <div className="parent h-[100vh] w-full absolute">
          <div className="form shadow-2xl h-[460px] w-[370px] my-[100px] mx-auto p-4 rounded-[31px] flex flex-col justify-between z-2 bg-white">
            <div className="items mt-8 flex flex-col gap-9">
              <p className=" text-center text-[20px] font-bold">
                Hesap oluşturmak
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
                type="text"
                placeholder="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
                type="text"
                placeholder="password"
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" p-2 w-[85%] self-center rounded-lg shadow-md  hover:scale-[1.02] duration-200 hover:shadow-xl"
                type="text"
                placeholder="confirm password"
              />
              <button
                onClick={async () => {
                  if (
                    password.length > 0 &&
                    confirmPassword.length > 0 &&
                    email.length > 0 &&
                    password === confirmPassword
                  ) {
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                      },
                    });
                    await Toast.fire({
                      icon: "success",
                      title: "Signed in successfully",
                    });
                    Cookies.set("number", 1);
                    router.push("/sign-in");
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Please check the information",
                    });
                  }
                }}
                className=" bg-customRed text-white py-2 px-9 my-0 mx-auto rounded-3xl  shadow-xl "
              >
                Yaratmak
              </button>
            </div>
            <div>
              <p className=" text-[14px]  text-black">
                Zaten hesabınız var mı?{" "}
                <Link
                  className="text-orange-600 font-bold"
                  href="/panel/sign-in"
                >
                  Giriş yapmak
                </Link>
              </p>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}

export default page;
