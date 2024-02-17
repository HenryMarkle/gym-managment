"use client";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../api/v1/events";
import "./main.css";
import Link from "next/link";
import DateConverter from "../../../components/dashboard/DateConvertor";
function page() {
  const [allEvents, setAllEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    getAllEvents().then((e) => {
      if (e == "error") setFetchError("error");
      else if (e == "unauthorized") setFetchError("unauthorized");
      else setAllEvents(e);
    });
  }, []);

  return (
    <>
      <div className="events ml-[24%] mr-[50px] shadow-md mt-10 rounded-[31px] p-3 flex flex-col  ">
        {allEvents
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((e) => (
            <div
              key={e.id}
              className="added-event ml-2 flex justify-between items-center px-4 py-4"
            >
              <div className=" event-info  flex gap-2 flex-1 mx-4">
                <span
                  className={`h-[25px] w-[25px] rounded-full ${
                    e.event === "create"
                      ? "bg-green-600"
                      : e.event === "update"
                      ? "bg-[#a39447]"
                      : "bg-[#a34747]"
                  } block`}
                ></span>
                <div className=" flex justify-between w-full">
                  <p className=" details-about-user">
                    {e.event + "d"} {e.target}
                  </p>
                  <Link
                    href={
                      e.target === "customer"
                        ? `/panel/customer/${e.id}`
                        : `/panel/manager/${e.id}`
                    }
                    className={`details ${
                      e.event === "create"
                        ? "bg-green-600"
                        : e.event === "update"
                        ? "bg-[#a39447]"
                        : "bg-[#a34747]"
                    } cursor-pointer px-3 py-1 rounded-2xl text-white`}
                  >
                    details
                  </Link>
                </div>
              </div>
              <div className="date">
                <span className=" font-bold">
                  {<DateConverter date={new Date(e.date).toDateString() } />}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
