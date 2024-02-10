import React from "react";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import "./helper.css";
export default function Trainers() {
  const dummayData = [
    {
      id: 1,
      img: "https://p16-sign-sg.lemon8cdn.com/tos-alisg-v-a3e477-sg/6afbcf3d78aa40c9971d58a67ed2bb38~tplv-sdweummd6v-shrink:1080:0:q50.webp?source=seo_feed_list&x-expires=1727956800&x-signature=8G%2FHV2SbQrJoVJ20CpMcKLPd%2BJE%3D",
      workTitle: "Strength Trainer",
      name: "Ali haseni",
      desc: "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 2,
      img: "https://static.standard.co.uk/2024/01/05/17/50/ES.jpg?crop=8:5,smart&quality=100&auto=webp&width=1920",
      name: "Ali haseni",
      workTitle: "Muscle Trainer",
      desc: "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 3,
      img: "data:image/jpeg;base64,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",
      name: "Ali haseni",
      workTitle: "Power Trainer",
      desc: "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
  ];
  return (
    <>
      <div className=" pt-[50px]">
        <p className="text-center  font-extrabold text-4xl ">
          EXPERT <span className="text-website2">TRAINERS</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="mt-10 text-center opacity-60">
          Nunc urna sem, laoreet ut metus id, aliquet consequat magna. Sed
          viverra ipsum dolor, ultricies fermentum massa consequat eu.
        </p>
        <div className="trainers flex justify-center mt-20 gap-20">
          {dummayData.map((ele) => {
            return (
              <>
                <div
                  key={ele.id}
                  className="trainer shadow-lg w-[300px] p-8 rounded-xl"
                >
                  <div
                    style={{ backgroundImage: `url(${ele.img})` }}
                    className="img"
                  >
                    {/* <img className="" src={ele.img} alt={ele.name} /> */}
                  </div>
                  <p className=" text-website2 text-sm mt-3 mb-3">
                    {ele.workTitle}
                  </p>
                  <p className="font-bold text-lg mb-3 ">{ele.name}</p>
                  <p className=" opacity-65 text-sm mb-4">{ele.desc}</p>
                  <div className="media flex gap-3  justify-center w-full">
                    <span>
                      <CiInstagram />
                    </span>
                    <span>
                      <CiFacebook />
                    </span>
                    <span>
                      <CiTwitter />
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
