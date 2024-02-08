import React from "react";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";

export default function Trainers() {
  const dummayData = [
    {
      id: 1,
      img: "https://themewagon.github.io/training-studio/assets/images/third-trainer.jpg",
      workTitle: "Strength Trainer",
      name: "Ali haseni",
      desc: "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 2,
      img: "https://themewagon.github.io/training-studio/assets/images/third-trainer.jpg",
      name: "Ali haseni",
      workTitle: "Muscle Trainer",
      desc: "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 3,
      img: "https://themewagon.github.io/training-studio/assets/images/third-trainer.jpg",
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
                  <img src={ele.img} alt={ele.name} />
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
