"use client";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { getAllCustomers } from "../api/v1/customer";
import "./main.css";
import Link from "next/link";
function page() {
  const [AllCustomers, setAllCustomers] = useState([]);
  const dummyData = [
    {
      id: 1,
      name: "Ali",
      surname: "Haseni",
      total: 1200,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
    {
      id: 2,
      name: "omer",
      surname: "Haseni",
      total: 1900,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "27 days",
    },
    {
      id: 3,
      name: "Adnan",
      surname: "Haseni",
      total: 2200,
      paid: 2000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
    {
      id: 4,
      name: "Sari",
      surname: "Haseni",
      total: 1200,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
    {
      id: 5,
      name: "Sari",
      surname: "Haseni",
      total: 1200,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
    {
      id: 6,
      name: "Sari",
      surname: "Haseni",
      total: 1200,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
    {
      id: 7,
      name: "Sari",
      surname: "Haseni",
      total: 2200,
      paid: 1000,
      shouldPay: 0,
      startedAt: "08-08-2008",
      EndAt: "08-08-2009",
      TimeLeft: "12 days",
    },
  ];

  useEffect(() => {
    const getAllCust = async () => {
      const result = await getAllCustomers();
      setAllCustomers(result);
      return result;
    };
    getAllCust().then((d) => console.log(d));
  }, []);

  return (
    <>
      <div className="tabel ml-[23%] mt-10 flex justify-between mr-[5%] shadow-xl h-[650px] rounded-xl p-7 overflow-y-scroll">
        <div className="custom-table w-full">
          <div className="head w-full flex justify-between border-b-2 py-3 text-center text-green-900 font-bold text-[18px] ">
            <span className="w-[9%]">Name</span>
            <span className="w-[9%]">Surname</span>
            <span className="w-[12%]">Total Price</span>
            <span className="w-[12%]">Paid</span>
            <span className="w-[13%]">Should pay</span>
            <span className="w-[15%]">Started At</span>
            <span className="w-[11%]">End At</span>
            <span className="w-[9%]">Days left</span>
            <div className="w-[11%]">
              <span></span>
              <span></span>
            </div>
          </div>
          {AllCustomers.map((ele) => {
            const startedAt = ele.startedAt;
            const dateObject = new Date(startedAt);
            const formattedDate = dateObject.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            const endsAt = ele.endsAt;
            const endDateObjext = new Date(endsAt);
            const formatedEndDate = endDateObjext.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            const getDayDifference = (formattedDate, formatedEndDate) => {
              const startDate = new Date(formattedDate);
              const endDate = new Date(formatedEndDate);

              const timeDifference = endDate.getTime() - startDate.getTime();

              const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

              return Math.abs(dayDifference);
            };

            return (
              <>
                <Link className="" href={`/customer/${ele.id}`}>
                  <div
                    key={ele.id}
                    className="body-table p-2 parent-table-div w-full flex justify-between pt-8 border-b-2 pb-8 text-center hover:bg-customRed bg-opacity-60 hover:text-white duration-300"
                  >
                    <span className=" w-[11%] text-start pl-2 ">
                      {ele.name.length > 8
                        ? ele.name.slice(0, 8) + "..."
                        : ele.name}
                    </span>
                    <span className=" w-[11%] ">{ele.surname}</span>
                    <span className=" w-[11%]">{ele.bucketPrice}</span>
                    <span className=" w-[11%]">{ele.paymentAmount}</span>
                    <span className=" w-[11%]">
                      {ele.bucketPrice - ele.paymentAmount}
                    </span>
                    <span className=" w-[11%]">{formattedDate}</span>
                    <span className=" w-[11%]">{formatedEndDate}</span>
                    <span className=" w-[11%]">
                      {getDayDifference(formattedDate, formatedEndDate)} days
                    </span>
                  </div>{" "}
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
