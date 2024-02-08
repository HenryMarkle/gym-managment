"use client";
import React, { useEffect, useState } from "react";
import img from "./website-images/gym-image.png";
import Image from "next/image";

import { getHomePlans } from "../../app/api/v1/dashboard";

function Plans() {
  const [plans, setPlans] = useState([]);

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
  });

  return (
    <>
      <div className="container-site">
        <p className="text-center  font-extrabold text-4xl ">
          CHOOSE <span className="text-website2">PLAN</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="mt-10 text-center opacity-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad reiciendis
          omnis suscipit ea, dolores vitae. Repellat tenetur amet impedit
          voluptates nihil deleniti nam, veniam, reiciendis quae facilis animi.
          Fugiat, illo.
        </p>
        <div className="plans w-full flex flex-col gap-14 items-start justify-center mt-16 ">
          {plans.map((ele) => {
            return (
              <>
                <div className="plan flex flex-row gap-4">
                  <Image src={img} />
                  <div className="content-of-plan flex flex-col justify-between">
                    <p className="text-xl font-medium">{ele.title}</p>
                    <p className=" opacity-70">{ele.description}</p>
                    <button className=" self-start text-website2 font-medium ">
                      Register Now
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Plans;
