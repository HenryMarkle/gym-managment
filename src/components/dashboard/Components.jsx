"use client";
import React from "react";
import "./helper.css";
import { CiSaveDown1 } from "react-icons/ci";
// const [planOpen, setPlanOpen] = React.useState(false);
export const HomePage = (
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
      <div className="5 flex flex-col">
        <label>plans description</label>
        <input
          defaultValue="default value"
          type="text"
          placeholder="plans description"
        />
      </div>
    </div>
    <div className="create-plan mt-5 w-full shadow-lg rounded-[30px] ">
      <div
        onClick={() => setPlanOpen(!planOpen)}
        className="header flex justify-between items-center  mt-4 px-2"
      >
        <p className="mb-2 text-[19px]">Create plan</p>
        <CiSaveDown1 size={21} />
      </div>
      <div className="form-content w-full rounded-[30px] py-1 shadow-lg"></div>
    </div>
  </>
);
export const ContactPage = (
  <>
    <div className="">ContactPage</div>
  </>
);
export const ManagersPage = (
  <>
    <div className="">ManagersPage</div>
  </>
);
export const ShopPage = (
  <>
    <div className="">ShopPage</div>
  </>
);
export const WorkoutsPage = (
  <>
    <div className="">WorkoutsPage</div>
  </>
);
