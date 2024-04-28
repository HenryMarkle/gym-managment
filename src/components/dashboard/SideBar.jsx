"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCalendar2EventFill } from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import { LiaChevronCircleUpSolid } from "react-icons/lia";
import { getGymName } from "../../app/api/v1/user";
import { signout } from "../../app/api/v1/auth";
import { usePathname } from "next/navigation";
import "./helper.css";

import {
  IoIosLogOut,
  IoIosAddCircle,
  IoIosNotifications,
} from "react-icons/io";
import Link from "next/link";

import { getAllUsers, createAnnouncement } from "../../app/api/v1/user";
import Swal from "sweetalert2";

function SideBar() {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [chooise, setChooise] = useState([]);
  const [openSelect, setOPenSelect] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const filterdArray = Array.from(new Set(chooise));
  const [mobile, setMobile] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [gymName, setGymName] = useState("");
  const path = usePathname();
  const router = useRouter();

  <FaHome size="23px" color="white" />;
  const [windows, setWindows] = useState([
    {
      id: 1,
      to: "/panel",
      title: "Home",
      icon: <FaHome size="23px" />,
      active: true,
    },
    {
      id: 2,
      to: "/panel/dashboard",
      title: "website panel",
      icon: <TiWorld size="23px" />,
      active: false,
    },
    {
      id: 3,
      to: "/panel/add-customer",
      title: "Create customer",
      icon: <IoIosAddCircle size="23px" />,
      active: false,
    },
    {
      id: 4,
      to: "/panel/customers",
      active: false,
      title: "Customers",
      icon: <FaClipboardList size="23px" />,
    },
    {
      id: 5,
      to: "/panel/add-manager",
      title: "Create Maneger",
      active: false,
      icon: <IoIosAddCircle size="23px" />,
    },
    {
      id: 6,
      to: "/panel/managers",
      title: "managers",
      active: false,
      icon: <BsFillPersonFill size="23px" />,
    },
    {
      id: 7,
      to: "/panel/events",
      active: false,
      title: "events",
      icon: <BsCalendar2EventFill size="23px" />,
    },
  ]);

  useEffect(() => {
    console.log(filterdArray);
    console.log(message);
    console.log("Chosen: " + chooise);
    getGymName().then((n) => {
      setGymName(n ?? "Gym");
    });
  }, [chooise]);

  useEffect(() => {
    getAllUsers().then((v) => {
      setDummyData(v ?? []);
      console.log(v);
    });
  }, []);

  return (
    <>
      <div
        className={
          showMessage
            ? `sidebar ${
                mobile && `open-sidebar  `
              } w-[820px] h-[100vh] fixed top-0 left-0 flex  bg-white rounded-tr-[31px]  p-[25px] duration-500 z-[100]`
            : `sidebar ${
                mobile && `open-sidebar`
              } w-[290px] h-[100vh] fixed top-0 left-0  bg-white  p-[15px] duration-500 z-[100]`
        }
      >
        <div className="show-mobile w-full justify-between hidden items-center">
          {mobile ? (
            <div className="flex items-center justify-between w-auto">
              <IoIosCloseCircleOutline
                className=" flex justify-center items-center text-[30px] text-white ml-2 w-auto"
                onClick={() => setMobile(!mobile)}
              />
            </div>
          ) : (
            <RxHamburgerMenu
              onClick={() => setMobile(!mobile)}
              className=" flex justify-center items-center text-[30px] text-white ml-2"
            />
          )}
        </div>
        <div className="mt-[30px]">
          <div className="flex  justify-between  items-center mb-5 mx-4">
            <Link className=" text-center" href="/panel">
              <p className="gym-tit font-bold text-[23px] text-center text-[#5540fb]">
                {gymName}
              </p>
            </Link>
          </div>
          <div className="top-content flex flex-col  mx-4 ">
            <div className=" h-[60vh] mt-[40px] w-full  flex flex-col items-start self-center gap-[15px] ">
              {windows.map((ele) => {
                path
                  ? null
                  : window.sessionStorage.setItem("activePath", windows[0].to);
                return (
                  <React.Fragment key={ele.to}>
                    <div
                      onClick={() =>
                        window.sessionStorage.setItem("activePath", ele.to)
                      }
                      className={`${
                        path === ele.to ? "bg-[#5540fb]" : "bg-white"
                      } w-full py-[8px] rounded-md duration-500`}
                    >
                      <Link
                        className="h-full "
                        onClick={() => {
                          setShowMessage(false);
                          setMobile(false);
                        }}
                        href={ele.to}
                      >
                        <div className="home flex gap-2 text-black  px-2">
                          <span
                            className={`${
                              path === ele.to ? " text-white" : "text-black"
                            } `}
                          >
                            {ele.icon}
                          </span>
                          <p
                            className={`${
                              path === ele.to ? " text-white" : "text-black"
                            } `}
                          >
                            {ele.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}
              {/* {mobile ? (
                <Link
                  onClick={() => {
                    setShowMessage(false);
                    setMobile(false);
                  }}
                  href="/panel/message-mobile"
                >
                  <div className=" flex  gap-4 text-black items-center  px-2">
                    <BiSolidMessageAdd size="23px" />
                    <p className="text-white">Craete message</p>
                  </div>
                </Link>
              ) : (
                <div
                  className="home flex justify-center gap-4 text-black items-center cursor-pointer "
                  onClick={() => setShowMessage(!showMessage)}
                >
                  <span>
                    <BiSolidMessageAdd size="23px" />
                  </span>{" "}
                  Create message
                </div>
              )} */}
            </div>
            <div className="flex logout mt-[106px] gap-3 items-center ml-4">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={async () => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Logout !",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      signout();
                      setTimeout(() => {
                        router.push("/panel/sign-in");
                      }, 100);
                    }
                  });
                }}
              >
                <IoIosLogOut
                  size="23px"
                  className=" font-bold "
                  color="black"
                />
                <button className="text-black bg-inherit font-bold border-none">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {showMessage ? (
          <div className="create-message flex-1  ml-[2%] rounded-[31px] relative overflow-hidden p-5 flex  gap-[20px] ">
            <div className="first ">
              <p className="text-center font-bold text-[#ffcb00] text-[24px] ">
                Create message
              </p>
              <div className="message-box h-[200px] overflow-y-auto ">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className=" resize-none w-full h-[300px] outline-none p-4 rounded-tl-[31px]"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <div className="choose-how-can-see mt-2">
                <p className="  text-[17px] text-[#ffcb00]">
                  To send it to everyone choose{" "}
                  <span className="font-bold">All</span>.
                </p>
                <div
                  onClick={() => setOPenSelect(!openSelect)}
                  className=" w-full text-white  mt-3 bg-customRed py-1 px-2 flex justify-between items-center rounded-[31px] "
                >
                  <span>Who Can see The message</span>
                  {openSelect ? (
                    <LiaChevronCircleUpSolid size={22} />
                  ) : (
                    <CiCircleChevDown size={22} />
                  )}
                </div>
                <div
                  className={
                    openSelect
                      ? "custom-select h-[200px] w-full overflow-y-auto flex flex-wrap justify-center p-2 mt-2 z-[1000] duration-300"
                      : "custom-select opacity-0 h-0 w-full overflow-y-auto flex flex-wrap justify-center p-2 mt-2 z-[1000] duration-300"
                  }
                >
                  <div className="option w-full flex items-center justify-center p-2 m-3">
                    <label
                      className=" text-white text-[17px] mr-1"
                      htmlFor="All"
                    >
                      All
                    </label>
                    <input
                      onChange={() => {
                        setIsAllChecked(!isAllChecked);
                        chooise[0] = "All";
                        chooise.length = 1;
                        console.log(chooise);
                      }}
                      className=" h-[25px] w-[22px] outline-none border-none"
                      type="checkbox"
                      id="All"
                    />
                  </div>
                  {isAllChecked ? (
                    <p className=" text-[#ffcb00]  duration-300 opacity-90 mx-2 my-2 font-bold">
                      All managers will recive the message
                    </p>
                  ) : (
                    <p className=" text-[#ffcb00] absolute  opacity-0 font-bold ">
                      All managers will recive the message
                    </p>
                  )}
                  {dummyData.map((e) => {
                    return (
                      <>
                        <div
                          key={e.id}
                          className="option w-[45%] flex items-center p-2"
                        >
                          <label
                            className=" text-white text-[17px] mr-1"
                            htmlFor={`${e.id}`}
                          >
                            {e.name}
                          </label>
                          {isAllChecked ? null : (
                            <input
                              onChange={() => {
                                chooise[0] = " ";
                                setChooise((c) => [...c, e.id]);
                              }}
                              className=" h-[25px] w-[22px] outline-none border-none"
                              type="checkbox"
                              id={`${e.id}`}
                            />
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={async () => {
                  const res = await createAnnouncement(
                    message,
                    isAllChecked,
                    filterdArray.slice(1)
                  );
                  console.log(res);
                  console.log("filtered: " + filterdArray);
                }}
                className=" text-green-700 shadow-xl h-max w-max mx-auto my-0 px-10 py-1 bg-[#ffcb00] rounded-[31px] font-bold"
              >
                Submit
              </button>
            </div>
            <div
              onClick={() => setShowMessage(!showMessage)}
              className="second self-center w-[100px] -right-16 absolute cursor-pointer"
            >
              <IoIosCloseCircle size={30} color="white" />
            </div>
          </div>
        ) : (
          <div className="create-message w-[1px] bg-red-600 ml-14 rounded-[31px] overflow-hidden duration-900"></div>
        )}
      </div>
    </>
  );
}
export default SideBar;
