import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./helper.css";
function page() {
  const lorem = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
  laboriosam tempora fugiat vel, quod praesentium deleniti dolore
  dignissimos doloribus, optio omnis sint corrupti voluptatem quos
  nostrum molestias ab nam. Deleniti! Lorem ipsum dolor sit, amet
  consectetur adipisicing elit. Fugit laboriosam tempora fugiat
  vel, quod praesentium deleniti dolore dignissimos doloribus,
  optio omnis sint corrupti voluptatem quos nostrum molestias ab
  nam. Deleniti! Lorem ipsum dolor sit, amet consectetur
  adipisicing elit. Fugit laboriosam tempora fugiat vel, quod
  praesentium deleniti dolore dignissimos doloribus, optio omnis
  sint corrupti voluptatem quos nostrum molestias ab nam.
  Deleniti! Lorem ipsum dolor sit, amet consectetur adipisicing
  elit. Fugit laboriosam tempora fugiat vel, quod praesentium
  deleniti dolore dignissimos doloribus, optio omnis sint corrupti
  voluptatem quos nostrum molestias ab nam. Deleniti!`;

  return (
    <>
      <div className="plans px-[40px] py-10 flex flex-col gap-10">
        <p className=" font-extrabold text-5xl text-website2">Plans</p>
        <div className="plan-border-b pb-6">
          <div className="plan shadow-md h-[250px] rounded-xl overflow-hidden flex gap-3">
            <Link href={`/plan/2`}>
              <div className=" flex gap-4">
                <div className="img">
                  <img
                    className="h-[250px] w-[1950px]"
                    src={"https://www.gymhealth.com.tr/img/pictures/16.jpg"}
                  />
                </div>
                <div className="content flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col ">
                      <p className=" font-extrabold text-3xl">Plan title</p>
                      <div className="plan-features  mt-3">
                        <ul style={{ listStyle: "inside" }} className="flex">
                          <li className="mr-10 font-extrabold">
                            4 month subsecription
                          </li>
                          <li className="mr-10 font-extrabold">Dietisian</li>
                          <li className="mr-10 font-extrabold">
                            Private trainer
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-5">
                      {lorem.length > 200 ? lorem.slice(0, 700) + "..." : lorem}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="price  pr-3 w-[790px]  bg-[#ed563f] text-white cursor-pointer py-2 hover:bg-orange-500 duration-300  ">
              <Link
                className="w-full h-full flex flex-col justify-between items-center"
                target="_blank"
                href={`https://wa.me/+905399127498?text=Hello sr how are you ?`}
              >
                <span className="font-bold text-2xl">1240 TL</span>
                <span className=" font-extrabold text-2xl">Buy now !</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="plan-border-b pb-6">
          <div className="plan shadow-md h-[250px] rounded-xl overflow-hidden flex gap-3">
            <Link href={`/plan/2`}>
              <div className=" flex gap-4">
                <div className="img">
                  <img
                    className="h-[250px] w-[1950px]"
                    src={"https://www.gymhealth.com.tr/img/pictures/16.jpg"}
                  />
                </div>
                <div className="content flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col ">
                      <p className=" font-extrabold text-3xl">Plan title</p>
                      <div className="plan-features  mt-3">
                        <ul style={{ listStyle: "inside" }} className="flex">
                          <li className="mr-10 font-extrabold">
                            4 month subsecription
                          </li>
                          <li className="mr-10 font-extrabold">Dietisian</li>
                          <li className="mr-10 font-extrabold">
                            Private trainer
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-5">
                      {lorem.length > 200 ? lorem.slice(0, 700) + "..." : lorem}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="price  pr-3 w-[790px]  bg-[#ed563f] text-white cursor-pointer py-2 hover:bg-orange-500 duration-300  ">
              <Link
                className="w-full h-full flex flex-col justify-between items-center"
                target="_blank"
                href={`https://wa.me/+905399127498?text=Hello sr how are you ?`}
              >
                <span className="font-bold text-2xl">1240 TL</span>
                <span className=" font-extrabold text-2xl">Buy now !</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
