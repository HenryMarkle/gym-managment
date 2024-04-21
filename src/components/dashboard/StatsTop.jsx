"use client";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  countCustomers,
  countCustomersWillEndIn,
  countExpiredCustomers,
} from "../../app/api/v1/customer";
import { countUsers } from "../../app/api/v1/user";
import { HiUsers } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useRouter } from "next/navigation";

function Stats_top() {
  const router = useRouter();
  const [allCustomers, setAllCustomers] = useState(0);
  const [endingCustomers, setEndingCustomers] = useState(0);
  const [expiredCustomers, setExpiredCustomers] = useState(0);
  const [allUsers, setAllUsers] = useState(0);

  useEffect(() => {
    countCustomers().then((n) => setAllCustomers(n));
    countUsers().then((n) => setAllUsers(n));

    const d = new Date();

    countCustomersWillEndIn(d.setDate(d.getDate() + 7)).then((n) =>
      setEndingCustomers(n)
    );
    countExpiredCustomers().then((n) => setExpiredCustomers(n));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <p className=" font-bold text-2xl">Welcome,Gym</p>
          <p className=" opacity-60">manage your gym</p>
        </div>
        <div className="flex gap-3">
          <p className="h-[30px] bg-white items-center flex w-[30px] justify-center rounded-md">
            <CiSettings
              onClick={() => router.push("panel/settings")}
              size={23}
            />
          </p>
          <p className="h-[30px] relative bg-white items-center flex w-[30px] justify-center rounded-md">
            <HiOutlineBellAlert
              onClick={() => router.push("panel/notifications")}
              size={23}
            />
            <span className="absolute top-0 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-5 gap-5">
        <div className=" bg-white w-1/4 flex justify-center items-center py-[15px] h-[120px] rounded-md">
          <div className="flex gap-5 mt-4">
            <p className=" self-center">
              <HiUsers size={55} />
            </p>
            <div>
              <p className=" opacity-80">Cureent users</p>
              <span className="text-black font-extrabold text-[30px]">
                <CountUp end={allCustomers} duration={3} />
              </span>
            </div>
          </div>
        </div>
        <div className=" bg-white w-1/4 flex justify-center items-center py-[15px] h-[120px] rounded-md">
          <div className="flex gap-5 mt-4">
            <p className=" self-center">
              <HiUsers size={55} />
            </p>
            <div>
              <p className=" opacity-80">Cureent Managers</p>
              <span className="text-black font-extrabold text-[30px]">
                <CountUp end={allUsers} duration={3} />
              </span>
            </div>
          </div>
        </div>{" "}
        <div className=" bg-white w-1/4 flex justify-center items-center py-[15px] h-[120px] rounded-md">
          <div className="flex gap-5 mt-4">
            <p className=" self-center">
              <HiUsers size={55} />
            </p>
            <div>
              <p className=" opacity-80">End in 1 Week</p>
              <span className="text-black font-extrabold text-[30px]">
                <CountUp end={endingCustomers} duration={3} />
              </span>
            </div>
          </div>
        </div>{" "}
        <div className=" bg-white w-1/4 flex justify-center items-center py-[15px] h-[120px] rounded-md">
          <div className="flex gap-5 mt-4">
            <p className=" self-center">
              <HiUsers size={55} />
            </p>
            <div>
              <p className=" opacity-80">Ended users</p>
              <span className="text-black font-extrabold text-[30px]">
                <CountUp end={expiredCustomers} duration={3} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats_top;
