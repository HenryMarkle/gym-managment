import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { months } from "./data";
const App = ({ data, title }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    colors: ["#3600FB"],
    xaxis: {
      categories: months,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Customers",
      data: data,
    },
  ]);

  useEffect(() => {
    setSeries([{ name: "Customers", data: data }]);
  }, [data]);

  return (
    <>
      <p className="text-txt_primery font-bold">{title}</p>
      <Chart
        options={options}
        series={series}
        type="line"
        width={750}
        height={246}
      />
    </>
  );
};

export default App;
