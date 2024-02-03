"use client";
import React, { useState } from "react";
import "./helper.css";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";

export function HomePage() {
  const [planOpen, setPlanOpen] = useState(true);

  /// Plan values

  const [planTitle, setPlanTitle] = useState("");
  const [planDesc, setPlanDesc] = useState("");
  const [planPrice, setPlanPrice] = useState("");

  return (
    <>
      <div className="p-2  grid grid-cols-2 gap-7 ">
        <div className="1 flex flex-col">
          <label htmlFor="">Gym title</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="Gym title"
          />
        </div>
        <div className="2 flex flex-col">
          <label htmlFor="">starter sentence</label>
          <input
            type="text"
            defaultValue="default value"
            placeholder="starter sentence"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="image">Background image</label>
          <input
            type="file"
            className="third border-none bg-white"
            name=""
            id="image"
          />
        </div>
        <div className="5 flex flex-col">
          <label>plans description</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="plans description"
          />
        </div>
      </div>
      <div
        className={`create-plan mt-5 w-full shadow-lg overflow-hidden rounded-[30px] duration-700  ${
          planOpen ? "h-[250px]" : "h-[55px]"
        }`}
      >
        <div
          onClick={() => setPlanOpen(!planOpen)}
          className="header flex justify-between items-center mt-4 px-2 cursor-pointer"
        >
          <p className="mb-2 text-[19px]">Create plan</p>
          {planOpen ? <CiSaveUp1 size={24} /> : <CiSaveDown1 size={24} />}
        </div>
        <div className="form-content w-full rounded-[30px] py-1 px-5 grid grid-cols-2 gap-7">
          <div className="plan-title flex flex-col">
            <label htmlFor="">Plan title</label>
            <input
              onChange={(e) => setPlanTitle(e.target.value)}
              type="text"
              placeholder="Plan title"
            />
          </div>{" "}
          <div className="plan-desc flex flex-col">
            <label htmlFor="">Plan description</label>
            <input
              onChange={(e) => setPlanDesc(e.target.value)}
              type="text"
              placeholder="Plan description"
            />
          </div>
          <div className="plan-price flex flex-col">
            <label htmlFor="">Plan price</label>
            <input
              onChange={(e) => setPlanPrice(e.target.value)}
              type="text"
              placeholder="Plan description"
            />
          </div>
          <button
            className={`bg-[#eee] duration-500 hover:bg-green-600 hover:text-white h-[40px] self-end rounded-[31px] text-green-500 text-[23px] shadow-2xl ${
              (planDesc.length || planDesc.length) && "bg-green-500 text-white"
            }`}
          >
            Create
          </button>
        </div>
      </div>
      <div className="p-2  grid grid-cols-2 gap-7 mt-7">
        <div className=" flex flex-col">
          <label htmlFor="image">Ads Background image</label>
          <input
            type="file"
            className="third border-none bg-white"
            name=""
            id="image"
          />
        </div>
        <div className="4 flex flex-col">
          <label>Ads on image (Bold text)</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="Ads on image"
          />
        </div>
        <div className="5 flex flex-col">
          <label>Ads on image (descriptio)</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="Ads on image"
          />
        </div>
      </div>
    </>
  );
}
