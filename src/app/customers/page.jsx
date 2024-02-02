"use client";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../api/v1/customer";
import "./main.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
function page() {
  const [AllCustomers, setAllCustomers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getAllCust = async () => {
      const result = await getAllCustomers();
      setAllCustomers(result ?? []);
      return result;
    };
    getAllCust().then((d) => console.log(d));
  }, []);

  return (
    <>
      <table className="ml-[25%] mt-5 shadow-xl p-6 rounded-[31px] overflow-hidden">
        <tr className=" h-[60px]">
          <th className=" border-r-[1px] border-green-600">Name</th>
          <th className=" border-r-[1px] border-green-600">Age</th>
          <th className=" border-r-[1px] border-green-600">Gender</th>
          <th className=" border-r-[1px] border-green-600">Package</th>
          <th className=" border-r-[1px] border-green-600">Paid</th>
          <th className=" border-r-[1px] border-green-600">Should Pay</th>
          <th className=" border-r-[1px] border-green-600">Start Date</th>
          <th className=" border-r-[1px] border-green-600">End Date</th>
          <th className=" border-r-[1px] ">Days Left</th>
        </tr>
        {AllCustomers?.map((c) => (
          <tr
            onClick={() => router.push(`/customer/${c.id}`)}
            className=" h-[90px]"
          >
            <td>
              {`${c.name.length > 8 ? c.name.slice(0, 8) : c.name} ` +
                `${
                  c.surname.length > 8
                    ? c.surname.slice(0, 8) + "..."
                    : c.surname
                }`}
            </td>
            <td>{c.age}</td>
            <td>{c.gender}</td>
            <td>{c.bucketPrice}</td>
            <td>{c.paymentAmount}</td>
            <td>{c.bucketPrice - c.paymentAmount}</td>
            <td>{new Date(c.startedAt).toDateString()}</td>
            <td>{new Date(c.endsAt).toDateString()}</td>
            <td>{Math.ceil((new Date(c.endsAt) - new Date()) / (1000 * 60 * 60 * 24))}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default page;
