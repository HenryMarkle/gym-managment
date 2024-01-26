"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
function ChartComponent({ title }) {
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
              data: [5, 6, 3, 3, 6, 1, 8, 3, 6, 2, 8, 12],
              backgroundColor: "#118CAF",
            },
          ],
        }}
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
