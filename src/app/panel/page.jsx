"use client";
import React, { useEffect, useState } from "react";
import Chart from "../../components/dashboard/Chart";
import Stats_top from "../../components/dashboard/StatsTop";
import { useRouter, usePathname } from "next/navigation";
import MoneyStats from "../../components/dashboard/RightSideStats";
import {
  getUsersLeftChartData,
  getUsersCreatedChartData,
} from "../../app/api/v1/user";

function page() {
  const router = useRouter();
  const path = usePathname();
  const [left, setLeft] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [created, setCreated] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getUsersLeftChartData().then((l) => {
      if (l === "error" || l === "unauthorized") {
      } else setLeft(l);
      console.log(l);
    });

    getUsersCreatedChartData().then((u) => {
      if (u === "error" || u === "unauthorized") {
      } else setCreated(u);
      console.log(u);
    });
  }, []);

  useEffect(() => {
    // router.push("/");
  }, []);

  return (
    <>
      {path.includes("panel") && (
        <div className="father-home overflow-hidden">
          <div className="home-content flex w-[78%] flex-col mt-10 ml-[370px]">
            <Stats_top />
            <div className="info-stats flex mt-[80px] gap-[10px] ml-10 h-auto w-full ">
              <div className="left-main w-[60%] ml-2 p-2  ">
                <div className="left-1 h-[400px] ">
                  <Chart title="New Customers" data={created} />
                </div>
                <div className="left-2 h-[400px]">
                  <Chart
                    title="Ending Subscriptions This Year Lol"
                    data={left}
                  />
                </div>
              </div>
              <MoneyStats />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
