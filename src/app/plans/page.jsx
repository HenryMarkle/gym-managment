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
      <div className="plans lg:px-[50px] h-max p-3 lg:py-10 flex flex-col lg:gap-10">
        <p className=" font-extrabold  text-xl lg:text-5xl text-website2">
          Plans
        </p>
        <div className="plan-border-b pb-6">
          <div className="plan shadow-md lg:h-[250px] rounded-xl overflow-hidden lg:flex  gap-3">
            <Link href={`/plan/2`}>
              <div className=" h-fit flex flex-col lg:flex-row gap-4">
                <div className="img">
                  <img
                    className="lg:h-[250px] lg:w-[1950px]"
                    src={"https://www.gymhealth.com.tr/img/pictures/16.jpg"}
                  />
                </div>
                <div className="content overflow-hidden lg:flex lg:flex-col lg:justify-between">
                  <div className="overflow-hidden">
                    <div className="flex flex-col ">
                      <p className=" font-extrabold text-website2 text-[20px] lg:text-3xl">
                        Plan title
                      </p>
                      <div className="plan-features flex flex-wrap  mt-3">
                        <ul
                          style={{ listStyle: "inside" }}
                          className="flex flex-wrap "
                        >
                          <li className="lg:mr-10 p-2 text-sm font-extrabold">
                            4 month subsecription
                          </li>
                          <li className="lg:mr-10 p-2 text-sm font-extrabold">
                            Dietisian
                          </li>
                          <li className="lg:mr-10 p-2 text-sm font-extrabold">
                            Private trainer
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="  text-sm lg:text-md mt-2">
                      {lorem.length > 200 ? lorem.slice(0, 700) + "..." : lorem}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="price pr-3 lg:w-[790px] bg-orange-600  lg:bg-[#ed563f] text-white cursor-pointer py-2 hover:bg-orange-500 duration-300  ">
              <Link
                className="w-full h-full flex flex-col justify-between items-center"
                target="_blank"
                href={`https://wa.me/+905399127498?text=Hello sr how are you ?`}
              >
                <span className="font-bold lg:text-2xl">1240 TL</span>
                <span className=" font-extrabold lg:text-2xl">Buy now !</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
