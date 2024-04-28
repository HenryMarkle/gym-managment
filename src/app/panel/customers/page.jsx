"use client";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../api/v1/customer";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DateConvertor from "../../../components/dashboard/DateConvertor";
function page() {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
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

  const handleSelectClick = () => {
    setSelectIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="bg-bg_custom h-[100vh]">
        <div className="search ml-[21%]   flex justify-between items-center flex-row-reverse gap-10 mx-8 pt-8">
          <div className="flex px-1 rounded-xl bg-white items-center self-baseline w-[400px]">
            <CiSearch size={30} color="gray" className="mr-2 h-[50px]" />
            <input
              style={{ border: "none" }}
              onChange={(e) => setFilterValue(e.target.value)}
              className="py-2 w-full "
              type="text"
              placeholder="Search Customer"
            />
          </div>
          <div
            className={`bg-white overflow-hidden rounded-md px-2 duration-300 py-2 w-[220px] ${
              selectIsOpen ? "h-[230px]" : "h-[50px]"
            }`}
          >
            <div className="flex justify-around items-center mb-4 mt-[5px] z-50">
              <span>
                <MdOutlineFilterList size={23} color="gray" />
              </span>
              <p className="text-gray-500">Sort by price</p>
              <span onClick={handleSelectClick}>
                <MdOutlineKeyboardArrowDown size={23} color="gray" />
              </span>
            </div>
            {filterObject.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <p
                    onClick={() => handelActive(ele.id)}
                    className={` px-3 py-1 cursor-pointer duration-300 border-b-2 last:border-0 hover:ml-2 hover:border-border_primery hover:text-txt_primery ${
                      ele.active ? "text-black" : "text-black"
                    }`}
                  >
                    {ele.title}
                  </p>
                </React.Fragment>
              );
            })}
          </div>
          {/* <div className="filtersOntable mt-5 flex gap-3 items-center">
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
            </div> */}
        </div>
        <div className="ml-[21%] relative w-[77%] mt-5 bg-white p-6 rounded-[9px] mb-5">
          <div className="table w-full border-[1px] border-gray-200 rounded-[9px]">
            <div className="t-head flex w-full  border-b-[1px] p-5">
              <p className="w-[14.2%] text-gray-500">Name</p>
              <p className="w-[14.2%] text-gray-500">Age</p>
              <p className="w-[14.2%] text-gray-500">Gender</p>
              <p className="w-[14.2%] text-gray-500">Package</p>
              <p className="w-[14.2%] text-gray-500">Start Date</p>
              <p className="w-[14.2%] text-gray-500">End Date</p>
              <p className="w-[14.2%] text-gray-500">Days left</p>
            </div>
            {AllCustomers.length > 0 &&
              AllCustomers?.filter(
                (el) =>
                  el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
                  el.name?.toUpperCase() === filterValue.toUpperCase() ||
                  `${el.name + el.surname}`
                    .toUpperCase()
                    .replace(/\s/g, "")
                    .includes(filterValue.toUpperCase().replace(/\s/g, ""))
              )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((e) => {
                  return (
                    <>
                      <div className="w-full flex justify-between border-b-2 px-4 py-5">
                        <p className="w-[14.2%]">
                          <div className="flex items-center gap-2">
                            <img
                              className="h-[30px] rounded-full"
                              src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                              alt=""
                            />
                            <p>
                              {(e.name + "" + e.surname).length > 10
                                ? (e.name + "" + e.surname).slice(0, 8) + "..."
                                : e.name + "" + e.surname}
                            </p>
                          </div>
                        </p>
                        <p className="w-[14.2%]">{e.age}</p>
                        <p className="w-[14.2%]">{e.gender}</p>
                        <div className="w-[14.2%] bg-[#f86e372c] flex items-center justify-center py-2 rounded-[9px]  mr-[90px] text-center">
                          <p className="text-txt_secondery">{e.bucketPrice}</p>
                        </div>
                        <p className="w-[14.2%]">
                          {
                            <DateConvertor
                              date={new Date(e.startedAt).toDateString()}
                            />
                          }
                        </p>
                        <p className="w-[14.2%]">
                          <DateConvertor
                            date={new Date(e.endsAt).toDateString()}
                          />
                        </p>
                        <p className="w-[14.2%]">
                          {Math.ceil(
                            (new Date(e.endsAt) - new Date()) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </p>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
