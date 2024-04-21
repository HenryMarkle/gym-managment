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
        <div className="overflow-hidden bg-[#eee]">
          <div className="home-content flex w-[77%] flex-col pt-8 ml-[330px] ">
            <Stats_top />
            <div className="info-stats flex mt-[80px] gap-[10px]  h-auto w-full ">
              <div className="left-main w-[70%] flex flex-col gap-2 rounded-md">
                <div className="left-1 h-[400px] bg-white p-2 rounded-md">
                  <Chart title="New Customers" data={created} />
                </div>
                <div className="left-2 w-full h-[300px] bg-white p-2 rounded-md">
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
