import React from "react";
import img from "./website-images/gym-image.png";
import Image from "next/image";
function Plans() {
  const plans = [
    {
      id: 1,
      title: "Plan Title 1",
      desc: "  Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
    },
    {
      id: 2,
      title: "Plan Title 2",
      desc: "  Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
    },
    {
      id: 3,
      title: "Plan Title 3",
      desc: "  Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
    },
    {
      id: 4,
      title: "Plan Title 4",
      desc: "  Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
    },
  ];
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
        <div className="plans w-full flex flex-col gap-14 items-center justify-center mt-16">
          {plans.map((ele) => {
            return (
              <>
                <div className="plan flex flex-row gap-4">
                  <Image src={img} />
                  <div className="content-of-plan flex flex-col justify-between">
                    <p className="text-xl font-medium">{ele.title}</p>
                    <p className=" opacity-70">{ele.desc}</p>
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
