"use client";
import React, { useState } from "react";
import "./helper.css";
import GoogleMaps from "../../components/website/GoogleMaps";
import { FaMapLocationDot } from "react-icons/fa6";
import { LiaPhoneVolumeSolid } from "react-icons/lia";

import { HiOutlineMailOpen } from "react-icons/hi";

function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMwssage] = useState("");
  return (
    <>
      <div className="lg:mx-[240px] lg:my-20 lg:grid lg:grid-cols-2 gap-10 p-4 overflow-hidden ">
        <div className="contact-left mb-10 lg:mb-2 border-b-2 pb-4">
          <div className="form-contact flex flex-col gap-10 h-[400px]">
            <div className="head">
              <p className="small-line relative h-[40px] font-extrabold text-2xl">
                Contact us
              </p>
              <p className="mt-3 opacity-75">Reach out to us for any inquiry</p>
            </div>
            <div className="inputs flex flex-col gap-3">
              <input
                onChange={(e) => setName(e.target.value)}
                className="border-2 px-1 py-2 rounded-md"
                type="text"
                placeholder="Full name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 px-1 py-2 rounded-md"
                type="text"
                placeholder="Email"
              />
              <textarea
                onChange={(e) => setMwssage(e.target.value)}
                placeholder="Message"
                className="px-1 border-2 rounded-md resize-y min-h-[100px] outline-none"
              ></textarea>
            </div>
            <div className="button">
              <button className=" bg-[#ed563b] w-full rounded-md py-2 text-white font-bold">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="contact-right relative p-4 lg:p-0 lg:h-[400px] w-auto">
          <GoogleMaps height={"400px"} />
          <div className="p absolute lg:-top-8 -top-3  mt-10-top-4 bg-[#ed563b] h-[300px] w-[200px] -z-10 -right-1 lg:-right-8"></div>
        </div>
      </div>
      <div className="bottom-icons lg:mx-[300px] lg:justify-center lg:pl-20 ">
        <div className=" lg:grid lg:grid-cols-3 flex flex-col gap-10 lg:gap-0 justify-center items-center mt-5 lg:mt-0 ">
          <div className="location flex gap-4">
            <div className="location-icon flex items-center">
              <FaMapLocationDot color="#ed563b" size={50} />
            </div>
            <div className="location-info">
              <p className=" font-bold">Location:</p>
              <p className=" opacity-50 text-sm">Dummy location as wish</p>
            </div>
          </div>
          <div className="email flex gap-4">
            <div className="location-icon flex items-center">
              <HiOutlineMailOpen color="#ed563b" size={50} />
            </div>
            <div className="location-info">
              <p className=" font-bold">Email:</p>
              <p className=" opacity-50 text-sm">Dummy location as wish</p>
            </div>
          </div>
          <div className="phone flex gap-4">
            <div className="location-icon flex items-center">
              <LiaPhoneVolumeSolid color="#ed563b" size={50} />
            </div>
            <div className="location-info">
              <p className=" font-bold">Phone:</p>
              <p className=" opacity-50 text-sm">Dummy location as wish</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
