"use client";
import "./main.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../api/v1/customer";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
function page() {
  const [AllCustomers, setAllCustomers] = useState([
    {
      id: 1,
      name: "Ali",
      surname: "Haseni",
      age: 12,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 2,
      name: "ahmad",
      surname: "Haseni",
      age: 32,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 3,
      name: "mira",
      surname: "Haseni",
      age: 51,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 4,
      name: "adnan",
      surname: "Haseni",
      age: 21,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 5,
      name: "hamza",
      surname: "Haseni",
      age: 51,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 6,
      name: "fadi",
      surname: "Haseni",
      age: 37,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 7,
      name: "abdo",
      surname: "Haseni",
      age: 32,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 8,
      name: "fatma",
      surname: "Haseni",
      age: 86,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 9,
      name: "usta",
      surname: "Haseni",
      age: 125,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 11,
      name: "receb",
      surname: "usta",
      age: 3,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 12,
      name: "receb",
      surname: "usta",
      age: 3,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
    {
      id: 13,
      name: "receb",
      surname: "usta",
      age: 3,
      bucketPrice: "1200",
      paymentAmount: "120",
      startedAt: "10-10-2020",
      endsAt: "12-10-2010",
      gender: "male",
    },
  ]);
  const [filterValue, setFilterValue] = useState("");
  const [lengs, setlngs] = useState(AllCustomers.length);
  const router = useRouter();
  // useEffect(() => {
  //   const getAllCust = async () => {
  //     const result = await getAllCustomers();
  //     setAllCustomers(result ?? []);
  //     return result;
  //   };
  //   getAllCust().then((d) => console.log(d));
  // }, []);

  useEffect(() => {
    const newLength = AllCustomers.filter(
      (el) =>
        el.name.toUpperCase().includes(filterValue.toUpperCase()) ||
        el.name.toUpperCase() === filterValue.toUpperCase() ||
        `${el.name + el.surname}`
          .toUpperCase()
          .replace(/\s/g, "")
          .includes(filterValue.toUpperCase().replace(/\s/g, ""))
    ).length;
    setlngs(newLength);
  }, [filterValue]);
  return (
    <>
      <div className="search ml-[27%] border-2 mr-[100px] mt-4 px-1 rounded-xl flex">
        <input
          onChange={(e) => setFilterValue(e.target.value)}
          className="py-3 w-full uppercase"
          type="text"
          placeholder="Search Customer"
        />
        <CiSearch size={30} className="mt-2" />
      </div>
      <div className="ml-[27%] mt-4 font-bold text-sm">
        you have {lengs} registers in this page.
      </div>
      <table className="ml-[25%] w-[70%] mt-5 shadow-xl p-6 rounded-[31px] overflow-hidden mb-5">
        <thead>
          <tr className=" h-[60px] hover:bg-green-200">
            <th className=" border-r-[1px]">Name</th>
            <th className=" border-r-[1px]">Age</th>
            <th className=" border-r-[1px]">Gender</th>
            <th className=" border-r-[1px]">Package</th>
            <th className=" border-r-[1px]">Paid</th>
            <th className=" border-r-[1px]">Should Pay</th>
            <th className=" border-r-[1px]">Start Date</th>
            <th className=" border-r-[1px]">End Date</th>
            <th className=" ">Days Left</th>
          </tr>
        </thead>
        <tbody>
          {AllCustomers.length > 0
            ? AllCustomers.filter(
                (el) =>
                  el.name.toUpperCase().includes(filterValue.toUpperCase()) ||
                  el.name.toUpperCase() === filterValue.toUpperCase() ||
                  `${el.name + el.surname}`
                    .toUpperCase()
                    .replace(/\s/g, "")
                    .includes(filterValue.toUpperCase().replace(/\s/g, ""))
              ).map((ele, index) => (
                <tr
                  key={ele.id}
                  onClick={() => router.push(`/panel/customer/${ele.id}`)}
                  className={`h-[90px]`}
                >
                  <td className=" relative">
                    {`${
                      ele.name.length > 8
                        ? ele.name.slice(0, 8)
                        : ele.name.toUpperCase()
                    } ` +
                      `${
                        ele.surname.length > 8
                          ? ele.surname.toUpperCase().slice(0, 8) + "..."
                          : ele.surname.toUpperCase()
                      }`}
                  </td>
                  <td>{ele.age}</td>
                  <td>{ele.gender}</td>
                  <td>{ele.bucketPrice}</td>
                  <td>{ele.paymentAmount}</td>
                  <td>{ele.bucketPrice - ele.paymentAmount}</td>
                  <td>{new Date(ele.startedAt).toDateString()}</td>
                  <td>{new Date(ele.endsAt).toDateString()}</td>
                  <td>
                    {Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </td>
                </tr>
              ))
            : // <p>No customers</p>
              null}
        </tbody>
      </table>
    </>
  );
}

export default page;
