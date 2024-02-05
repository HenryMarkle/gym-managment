"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleChevDown } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCalendar2EventFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { LiaChevronCircleUpSolid } from "react-icons/lia";
import { getGymName } from "../app/api/v1/user";
import { signout } from "../app/api/v1/auth"; 
import {
  IoIosLogOut,
  IoIosAddCircle,
  IoIosNotifications,
} from "react-icons/io";
import Link from "next/link";

import { getAllUsers, createAnnouncement } from "../app/api/v1/user";

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
  const router = useRouter();

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
              } w-[730px] h-[100vh] fixed top-0 left-0 flex  bg-customRed rounded-tr-[31px] rounded-br-[31px] p-[25px] duration-500 z-[100]`
            : `sidebar ${
                mobile && `open-sidebar`
              } w-[329px] h-[100vh] fixed top-0 left-0  bg-customRed rounded-tr-[31px] rounded-br-[31px] p-[15px] duration-500 z-[100]`
        }
      >
        <div className="show-mobile w-full flex justify-between hidden items-center">
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
          <Link href="/">
            <p className="font-bold text-[23px] text-white  ">{gymName}</p>
          </Link>
        </div>
        {mobile ? null : (
          <div className=" flex justify-between mb-5 mx-4">
            <Link className=" text-end" href="/">
              <p className="font-bold text-[23px] text-white  ">{gymName}</p>
            </Link>
            <Link
              href="/dashboard"
              className=" text-green-500 font-bold bg-white px-2 py-2 rounded-[6px]"
            >
              manage website
            </Link>
          </div>
        )}
        <div className="top-content flex flex-col gap-9 w-[210px]">
          <div className=" h-[60vh] content text-center flex flex-col items-start self-center gap-10 ml-9">
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <FaHome size="23px" />
                </span>
                Homepage
              </div>{" "}
            </Link>
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/add-customer"
            >
              <div className="home flex justify-center gap-4 text-white items-center">
                <span>
                  <IoIosAddCircle size="23px" />
                </span>{" "}
                Create customer
              </div>{" "}
            </Link>
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/customers"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <FaClipboardList size="23px" />
                </span>{" "}
                Customers
              </div>{" "}
            </Link>{" "}
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/add-manager"
            >
              <div className="home flex justify-center gap-4 text-white items-center">
                <span>
                  <IoIosAddCircle size="23px" />
                </span>{" "}
                Create Maneger
              </div>{" "}
            </Link>
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/managers"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <BsFillPersonFill size="23px" />
                </span>
                managers
              </div>
            </Link>
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/events"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <BsCalendar2EventFill size="23px" />
                </span>{" "}
                events
              </div>{" "}
            </Link>{" "}
            {mobile ? (
              <Link
                onClick={() => {
                  setShowMessage(false);
                  setMobile(false);
                }}
                href="message-mobile"
              >
                <div className=" flex justify-center gap-4 text-white items-center">
                  <BiSolidMessageAdd size="23px" />
                  <p className="text-white">Craete message</p>
                </div>
              </Link>
            ) : (
              <div
                className="home flex justify-center gap-4 text-white items-center cursor-pointer "
                onClick={() => setShowMessage(!showMessage)}
              >
                <span>
                  <BiSolidMessageAdd size="23px" />
                </span>{" "}
                Create message
              </div>
            )}
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/notifications"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <IoIosNotifications size="23px" />
                </span>{" "}
                Notifications
              </div>
            </Link>
            <Link
              onClick={() => {
                setShowMessage(false);
                setMobile(false);
              }}
              href="/settings"
            >
              <div className="home flex justify-center gap-4 text-white items-center ">
                <span>
                  <IoSettings size="23px" />
                </span>{" "}
                Settings
              </div>
            </Link>
          </div>
          <div className="flex logout justify-center mt-[106px] gap-3 items-center">
            <IoIosLogOut size="23px" className=" font-bold " color="white" />
            <button onClick={async () => {signout(); router.push('/sign-in'); }} className="text-white font-bold">Logout</button>
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
          <div className="create-message flex-1  ml-[7%] rounded-[31px]  overflow-hidden p-5 flex flex-col gap-[20px] ">
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
                  <label className=" text-white text-[17px] mr-1" htmlFor="All">
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
            {/* <div className="how-can-see-list p-2 w-full bg-customRed mt-5 rounded-[18px] h-auto overflow-y-auto">
              <span className=" flex justify-center text-[#ffcb00] font-bold mb-2">
                Who can see the message ?
              </span>
              <div className="members-can-see flex flex-wrap">
                {filterdArray.map((ele) => {
                  return (
                    <>
                      {ele != "" ? (
                        <p className="h-[30px] can-see w-max  m-2 p-1 bg-gray-100 rounded-lg relative ">
                          {ele}
                          <span
                            onClick={() => {
                              const indexToremove = filterdArray.indexOf(ele);
                              filterdArray.splice(indexToremove, 1);
                              setChooise(filterdArray);
                            }}
                            className="remove"
                          ></span>
                        </p>
                      ) : null}
                    </>
                  );
                })}
              </div>
            </div> */}
          </div>
        ) : (
          <div className="create-message w-[1px] bg-red-600 ml-14 rounded-[31px] overflow-hidden duration-900"></div>
        )}
      </div>
    </>
  );
}

export default SideBar;
