"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import Chart from "chart.js/auto";
function ChartComponent({ title, data }) {

  return (
    <>
      <Bar
        className="mb-10 shadow-lg p-4"
        data={{
          labels: [
            "January",
            "Fab",
            "March",
            "April",
            "May",
            "jun",
            "july",
            "augs",
            "oct",
            "sep",
            "nov",
            "dec",
          ],
          datasets: [
            {
              label: title,
              data,
              backgroundColor: "#118CAF",
            },
          ],
        }}
        content="white"
        height={200}
        width={100}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </>
  );
}

export default ChartComponent;
