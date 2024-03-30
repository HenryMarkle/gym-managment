import React, { useEffect, useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import "./helper.css";

import { getTrainers } from "../../app/api/v1/tariner";
import { getTrainerImageUrl } from "../../lib/images";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getTrainers()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className=" pt-[50px]">
        <p className="text-center  font-extrabold text-4xl ">
          EXPERT <span className="text-website2">TRAINERS</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>

        <div className="trainers flex justify-center mt-20 gap-20">
          {trainers?.map((ele) => {
            return (
              <>
                <div
                  key={ele.id}
                  className="trainer shadow-lg w-[300px] p-8 rounded-xl"
                >
                  <div
                    style={{ backgroundImage: `url(${ele.img})` }}
                    className="img"
                  ></div>
                  <p className=" text-website2 text-sm mt-3 mb-3">
                    {ele.workTitle}
                  </p>
                  <p className="font-bold text-lg mb-3 ">{ele.name}</p>
                  <p className=" opacity-65 text-sm mb-4">{ele.description}</p>
                  <div className="media flex gap-3  justify-center w-full">
                    <span>
                      <CiInstagram href={ele.instagram} />
                    </span>
                    <span>
                      <CiFacebook href={ele.facebook} />
                    </span>
                    <span>
                      <CiTwitter href={ele.twitter} />
                    </span>
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
