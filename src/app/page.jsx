"use client";
import React, { useEffect } from "react";
import Chart from "../components/Chart";
import Stats_top from "../components/StatsTop";
import { useRouter } from "next/navigation";
import MoneyStats from "../components/RightSideStats";
import tr from "../locales/tr";
import en from "../locales/en";
function page() {
  const router = useRouter();
  
  
  useEffect(() => {
    router.push("/");
  }, [])

  const { locale } = router;
  const t = locale === "en" ? en : tr;
  return (
    <>
      <div className="father-home overflow-hidden">
        <div className="home-content flex w-[78%] flex-col mt-10 ml-[370px]">
          <Stats_top />
          <div className="info-stats flex mt-[80px] gap-[10px] ml-10 h-auto w-full ">
            <div className="left-main w-[60%] ml-2 p-2  ">
              <div className="left-1 h-[400px] ">
                <Chart title="New Customers" />
              </div>
              <div className="left-2 h-[400px]">
                <Chart title="Customers left " />
              </div>
            </div>
            <MoneyStats />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
