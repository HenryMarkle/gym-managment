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
import { Svg1, Svg2, Svg3, Svg4 } from "../../assets/Svgs";
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
      <div className="flex justify-between mt-5 gap-5">
        <div className=" bg-white w-1/4 flex justify-center items-center py-[15px] h-[120px] rounded-md">
          <div className="flex gap-5 mt-4">
            <p className=" self-center">
              <Svg1 />
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
              <Svg2 />
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
              <Svg3 />
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
              <Svg4 />
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
