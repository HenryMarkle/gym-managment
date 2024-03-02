import React from "react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";

function page() {
  return (
    <>
      <div className="p-[50px]">
        <p className=" font-extrabold text-3xl text-website2">
          Biecips Exercises
        </p>
        <div className="exer-image mt-5 flex gap-10">
          <div className="exer-left-image bg-orange-400 h-[490px] w-[35%] overflow-hidden rounded-xl">
            <img
              className="h-full"
              src="https://cdn.mos.cms.futurecdn.net/zkrwxQVtsn3Yi2Pgmh89eN-1200-80.jpg"
              alt=""
            />
          </div>
          <div className="exer-right w-[63%] rounded-xl">
            <div className="exer-exercises flex flex-col gap-6">
              <div className="exer shadow-lg pl-3 rounded-xl h-[420px] overflow-y-scroll">
                <div className="title flex justify-between items-center ">
                  <p className="font-extrabold text-xl ">exercise name</p>
                  <p className="pr-2">
                    {/* <BsArrowDownCircleFill size={23} color="#ed563b" /> */}
                    <BsArrowUpCircleFill size={23} color="#ed563b" />
                  </p>
                </div>
                <div className="exer-contrent flex w-full h-[90%] ">
                  <div className="video w-[100%]">
                    <iframe
                      className="w-full h-[360px] my-5 rounded-lg"
                      src="https://www.youtube.com/embed/VIDEO_ID"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div className="description w-full pl-10 mt-5 font-bold pr-5 h-[90%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque eveniet quia praesentium quaerat deserunt et
                    inventore cum porro ex, repellat eum, aliquid, omnis
                    corrupti optio numquam quisquam ut magnam doloremque? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Itaque
                    eveniet quia praesentium quaerat deserunt et inventore cum
                    porro ex, repe Lorem ipsum
                  </div>
                </div>
              </div>{" "}
              <div className="exer shadow-lg pl-3 rounded-xl">
                <div className="title flex justify-between items-center h-[45px]">
                  <p className="font-extrabold text-xl ">exercise name</p>
                  <p className="pr-2">
                    <BsArrowDownCircleFill size={23} color="#ed563b" />
                  </p>
                </div>
              </div>{" "}
              <div className="exer shadow-lg pl-3 rounded-xl">
                <div className="title flex justify-between items-center h-[45px]">
                  <p className="font-extrabold text-xl ">exercise name</p>
                  <p className="pr-2">
                    <BsArrowDownCircleFill size={23} color="#ed563b" />
                  </p>
                </div>
              </div>{" "}
              <div className="exer shadow-lg pl-3 rounded-xl">
                <div className="title flex justify-between items-center h-[45px]">
                  <p className="font-extrabold text-xl ">exercise name</p>
                  <p className="pr-2">
                    <BsArrowDownCircleFill size={23} color="#ed563b" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
