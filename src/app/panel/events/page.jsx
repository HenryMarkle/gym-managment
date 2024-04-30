"use client";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../api/v1/events";
import Link from "next/link";
import DateConverter from "../../../components/dashboard/DateConvertor";

function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvents();
        setAllEvents(events);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFetchError("unauthorized");
        } else {
          setFetchError("error");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="events ml-[24%] mr-[50px] shadow-md mt-10 rounded-[31px] p-3 flex flex-col">
      {fetchError ? (
        <div>{fetchError === "unauthorized" ? "Unauthorized" : "Error"}</div>
      ) : (
        allEvents
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((event) => <EventItem key={event.id} event={event} />)
      )}
    </div>
  );
}

function EventItem({ event }) {
  const eventColor =
    event.event === "create"
      ? "bg-green-600"
      : event.event === "update"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="added-event ml-2 flex justify-between items-center px-4 py-4">
      <div className="event-info flex gap-2 flex-1 mx-4">
        <span
          className={`h-[25px] w-[25px] rounded-full ${eventColor} block`}
        />
        <div className="flex justify-between w-full">
          <p className="details-about-user">
            {event.event + "d"} {event.target}
          </p>
          <Link
            href={`/panel/${
              event.target === "customer" ? "customer" : "manager"
            }/${event.id}`}
            className={`details ${eventColor} cursor-pointer px-3 py-1 rounded-2xl text-white`}
          >
            Details
          </Link>
        </div>
      </div>
      <div className="date">
        <span className="font-bold">
          <DateConverter date={new Date(event.date).toDateString()} />
          <span className="ml-2">
            {new Date(event.date).getHours().toString().padStart(2, "0")}:
            {new Date(event.date).getMinutes().toString().padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}

export default EventsPage;
