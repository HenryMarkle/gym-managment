"use client";
import React, { useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";

import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import "./managers.css";
function page() {
  const dummyData = [
    {
      id: 1,
      image:
        "https://www.thimble.com/wp-content/uploads/2022/05/Personal-Trainer-Salary-Guide.jpg",
      name: "Abdullah Towait",
      jobTitle: "Strength Trainer",
      Instagram: "https:://",
      facebook: "https:://",
      twitter: "https:://",
      description:
        "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 2,
      image:
        "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM1OTAwNDIyMzUwMzQx/main2-trainer2.jpg",
      name: "Ali Haseni",
      jobTitle: "Muscle Trainer",
      Instagram: "https:://",
      facebook: "https:://",
      twitter: "https:://",
      description:
        "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
    {
      id: 3,
      image:
        "https://www.abdulhamittopcu.com/wp-content/uploads/2018/10/personal-trainer-1024x683.jpg",
      name: "Mo.Salum",
      jobTitle: "Power Trainer",
      Instagram: "https:://",
      facebook: "https:://",
      twitter: "https:://",
      description:
        "Bitters cliche tattooed 8-bit distillery mustache. Keytar succulents gluten-free vegan church-key pour-over seitan flannel.",
    },
  ];

  const [ManagerInEditing, setManagerInEditing] = useState();
  const [openManagers, setOpenManagers] = useState([]);

  return (
    <div className=" m-4 p-4 rounded-xl">
      <p className="font-bold text-3xl mb-6 ">Managers</p>
      <div className="flex gap-4">
        <div className="create shadow-lg w-[40%] h-max p-3 rounded-lg">
          <p className="font-bold text-center py-3">Create manager</p>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Image</label>
            <input className="" type="file" placeholder="job title" />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Job title</label>
            <input className="px-2" type="text" placeholder="job title" />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Name</label>
            <input className="px-2" type="text" placeholder="Name" />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Description</label>
            <input className="px-2" type="text" placeholder="Description" />
          </div>
          <p className="mt-4 font-bold py-2 border-y-2">
            Social media accounts
          </p>
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Instagram</label>
            <CiInstagram
              color="#C13584"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input className="px-2" type="text" placeholder="Instagram" />
          </div>{" "}
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Facebook</label>
            <CiFacebook
              color="#1877f2"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input className="px-2" type="text" placeholder="Facebook" />
          </div>
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Twitter(X)</label>
            <FaXTwitter
              color="#1da1f2"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input className="px-2" type="text" placeholder="Twitter(X)" />
          </div>
          <button className="px-4 py-2 rounded-xl bg-green-700 text-white font-bold w-full mt-4">
            Create manager
          </button>
        </div>
        <div className="managers shadow-lg w-[60%] ">
          {dummyData.map((ele) => {
            return (
              <>
                <div
                  className={`manager mx-3 mt-4 pb-6 shadow-md duration-300 overflow-hidden relative ${
                    openManagers.includes(ele.id) ? "h-max" : "h-[55px]"
                  }`}
                >
                  <div
                    onClick={() => {
                      if (openManagers.includes(ele.id)) {
                        setOpenManagers(
                          openManagers.filter((id) => id !== ele.id)
                        );
                      } else {
                        setOpenManagers([...openManagers, ele.id]);
                      }
                    }}
                    className="header flex items-center justify-between px-2 h-[55px]"
                  >
                    <p className="font-bold">{ele.name}</p>
                    <p>
                      <CiSaveDown1 size={22} />
                    </p>
                  </div>
                  <div className="content mt-10 flex gap-5 relative pt-4">
                    <div className="w-[50%]">
                      <img className="w-[100%]" src={ele.image} alt="" />
                    </div>
                    <div className="w-[50%]">
                      <div>
                        <label className="font-bold" htmlFor="">
                          Name :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.name}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Job title :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.jobTitle}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Instagram :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.Instagram}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Facebook :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.facebook}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Twitter :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.twitter}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>
                    </div>
                    <div className="flex absolute -top-8 right-0 mb-4 gap-2">
                      {ManagerInEditing === ele.id ? (
                        <MdOutlineCancel
                          size={23}
                          color="green"
                          onClick={() => setManagerInEditing(null)}
                        />
                      ) : (
                        <CiEdit
                          onClick={() => {
                            setManagerInEditing(ele.id);
                          }}
                          size={23}
                          color="green"
                        />
                      )}
                      <MdDeleteForever size={23} color="red" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold">Description : </p>
                    <textarea
                      disabled={ManagerInEditing ? false : true}
                      defaultValue={ele.description}
                      className="resize-none outline-none w-full border-2 px-2 mt-2 h-[200px]"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
