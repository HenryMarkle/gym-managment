"use client";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import img from "../../images/gym-image.png";
import Image from "next/image";

import { getHomePlans, getPlanParagraph } from "../../app/api/v1/dashboard";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    getHomePlans().then((plans) => {
      if (plans === "error" || plans === "unauthorized");
      else {
        for (let i = 0; i < plans.length; i++) {
          plans[i] = { ...plans[i], id: i };
        }

        setPlans(plans);
      }
    });

    getPlanParagraph().then((p) => {
      if (p !== "error") {
        setParagraph(p);
      }
    });
  }, []);

  return (
    <>
      <div className="container-site overflow-hidden">
        <p className="text-center  font-extrabold text-4xl ">
          CHOOSE <span className="text-website2">PLAN</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="mt-10 text-center opacity-60">{paragraph}</p>
        {plans.length ? (
          <div className="plans w-full flex flex-col gap-14 items-start justify-center mt-16 mx-auto my-0 px-[150px]">
            {plans.map((ele) => {
              return (
                <>
                  <div className="plan flex flex-row gap-4 w-full">
                    <Image src={img} />
                    <div className="content-of-plan flex flex-col justify-between w-full">
                      <p className="text-xl font-medium">{ele.title}</p>
                      <p
                        style={{ overflowWrap: "anywhere" }}
                        className=" opacity-70 py-2"
                      >
                        {ele.description}
                      </p>
                      <div className="flex justify-between w-full">
                        <button className=" self-start text-website2 font-medium ">
                          Register Now
                        </button>
                        <span className="text-website2 font-bold">
                          {ele.price} TL
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center my-20">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#ed563b"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Plans;
