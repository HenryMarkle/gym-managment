"use client";
import "./main.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../api/v1/customer";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import DateConvertor from "../../../components/dashboard/DateConvertor";
function page() {
  const [AllCustomers, setAllCustomers] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [lengs, setlngs] = useState(AllCustomers.length);
  const [daysFilter, setDaysFilter] = useState("");
  const [dayORmonthOryear, setDayORmonthOryear] = useState("days");
  const router = useRouter();
  const [filterObject, setFilterObject] = useState([
    { id: 1, active: true, title: "Start data" },
    { id: 5, active: false, title: "Ended Customers" },
    { id: 2, active: false, title: "End data" },
    { id: 3, active: false, title: "Price" },
    { id: 4, active: false, title: "Days left" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCustomers();
        switch (dayORmonthOryear) {
          case "days":
            setAllCustomers(
              result
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) < daysFilter
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          case "months":
            setAllCustomers(
              result
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <
                    daysFilter * 30
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          case "years":
            const filterdDate = setAllCustomers(
              result
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <
                    daysFilter * 365
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          default:
            break;
        }
        if (daysFilter === "") setAllCustomers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [daysFilter, dayORmonthOryear]);

  useEffect(() => {
    const getAllCust = async () => {
      const result = await getAllCustomers();

      let sortedResult = [...result];

      const activeFilter = filterObject.find((filter) => filter.active);
      if (activeFilter) {
        switch (activeFilter.title) {
          case "Start data":
            sortedResult.sort(
              (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
            );
            break;
          case "Ended Customers":
            const todayDateString = new Date().toDateString();
            sortedResult = sortedResult.filter(
              (ele) =>
                new Date(ele.endsAt).toDateString() === todayDateString ||
                Math.ceil(
                  (new Date(ele.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                ) < 0
            );
            break;
          case "End data":
            sortedResult.sort(
              (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
            );
            break;
          case "Price":
            sortedResult.sort((a, b) => b.bucketPrice - a.bucketPrice);
            break;
          case "Days left":
            sortedResult.sort(
              (a, b) =>
                Math.ceil(
                  (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                ) -
                Math.ceil(
                  (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                )
            );
            break;
          default:
            break;
        }
      }
      setAllCustomers(sortedResult);
      setlngs(sortedResult.length);
      return sortedResult;
    };

    getAllCust().then((d) => console.log(d));
  }, [filterObject]);
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
  const handelActive = (id) => {
    const activeSort = filterObject.map((ele) => ({
      ...ele,
      active: ele.id === id,
    }));
    setFilterObject(activeSort);
  };
  return (
    <>
      <div className="search ml-[27%] mt-4 px-1 flex items-center gap-10">
        <div className="flex justify-between border-2 px-1 rounded-xl">
          <input
            style={{ border: "none" }}
            onChange={(e) => setFilterValue(e.target.value)}
            className="py-3 w-full uppercase"
            type="text"
            placeholder="Search Customer"
          />
          <CiSearch size={30} className="mt-2" />
        </div>

        {/* Start filter option */}

        <div className=" flex flex-col mt-10">
          <div className="sort flex items-center border-b-2 pb-3">
            <div className="mr-2">
              <p className="font-bold">Sort by :</p>
            </div>
            <div className="sorting-options flex gap-8">
              {filterObject.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <p
                      onClick={() => handelActive(ele.id)}
                      className={`shadow-md px-3 py-1 cursor-pointer duration-300 rounded-lg ${
                        ele.active ? "bg-customRed font-bold text-white" : ""
                      }`}
                    >
                      {ele.title}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="filtersOntable mt-5 flex gap-3 items-center">
            <p className="font-bold">Customers registeration will end in :</p>
            <input
              onChange={(e) => setDaysFilter(e.target.value)}
              className="shadow-md px-2 py-1 w-[150px]"
              type="number"
              placeholder="for example : 7"
            />
            <select
              onChange={(e) => {
                daysFilter.length && setDayORmonthOryear(e.target.value);
              }}
              className="outline-none border-[#eee]"
              name=""
              id=""
            >
              <option value="days">days</option>
              <option value="months">monthes</option>
              <option value="years">years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="ml-[27%] mt-4 font-bold text-sm">
        you have {lengs} member in this table.
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
            ? AllCustomers?.filter(
                (el) =>
                  el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
                  el.name?.toUpperCase() === filterValue.toUpperCase() ||
                  `${el.name + el.surname}`
                    .toUpperCase()
                    .replace(/\s/g, "")
                    .includes(filterValue.toUpperCase().replace(/\s/g, ""))
              )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ele, index) => {
                  console.log(ele.createdAt.getMonth());
                  return (
                    <>
                      <tr
                        key={ele.id}
                        onClick={() => router.push(`/panel/customer/${ele.id}`)}
                        className={`h-[90px]`}
                      >
                        <td className=" relative">
                          {`${
                            ele.name.length > 8
                              ? ele.name?.slice(0, 8)
                              : ele.name?.toUpperCase()
                          } ` +
                            `${
                              ele.surname.length > 8
                                ? ele.surname?.toUpperCase().slice(0, 8) + "..."
                                : ele.surname?.toUpperCase()
                            }`}
                        </td>
                        <td>{ele.age}</td>
                        <td>{ele.gender}</td>
                        <td>{ele.bucketPrice} TL</td>
                        <td>{ele.paymentAmount} TL</td>
                        <td>{ele.bucketPrice - ele.paymentAmount} TL</td>
                        <td>
                          {
                            <DateConvertor
                              date={new Date(ele.startedAt).toDateString()}
                            />
                          }
                        </td>
                        <td>
                          {" "}
                          {
                            <DateConvertor
                              date={new Date(ele.endsAt).toDateString()}
                            />
                          }
                        </td>
                        <td>
                          {Math.ceil(
                            (new Date(ele.endsAt) - new Date()) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })
            : // <p>No customers</p>
              null}
        </tbody>
      </table>
    </>
  );
}

export default page;
