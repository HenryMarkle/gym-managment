"use client";
import React, { useState } from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";

import "../app/globals.css";
function Carousel({ data }) {
  const [goValue, setGoValue] = useState(0);

  const handelGoBackButton = () => {
    if (goValue === 0) {
      setGoValue(0);
    } else {
      setGoValue(goValue - 1);
    }
  };
  const handelGoForwardButton = () => {
    if (data.length - 1 <= goValue) {
      setGoValue(0);
    } else {
      setGoValue(goValue + 1);
    }
  };
  return (
    <>
      <div className="relative w-full h-full flex m-4">
        <p className="absolute right-2 -top-10 font-bold text-orange-600">
          {data.length ? goValue + 1 : goValue}/{data.length}
        </p>
        <div className="dots w-full -bottom-3 absolute my-0 mx-auto ">
          <ul className="flex justify-center list-none">
            {data.map((ele, index) => {
              return (
                <>
                  <li
                    onClick={() => setGoValue(index)}
                    className={`mx-1 h-2 w-2 rounded-full duration-300 ${
                      index === goValue ? "bg-orange-600" : "bg-white"
                    } border-[1px] border-orange-600`}
                  ></li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center">
          <div className="absolute  ml-2">
            <IoArrowBackCircle
              enableBackground={true}
              onClick={() => handelGoBackButton()}
              className="noSelect z-40 no-outline"
              size={23}
            />
          </div>
          <div className=" absolute right-0 mr-2">
            <IoArrowForwardCircleSharp
              enableBackground={true}
              onClick={() => handelGoForwardButton()}
              className="noSelect z-40 no-outline"
              size={23}
            />
          </div>
          <div className=" flex items-center justify-center">
            <img
              className="noSelect -p-8 w-full h-[300px]"
              src={data[goValue]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
