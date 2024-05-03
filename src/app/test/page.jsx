// "use client";
// import React, { useState } from "react";
// import Chart from "react-apexcharts";

// const App = ({ data }) => {
//   const [options, setOptions] = useState({
//     chart: {
//       id: "apexchart-example",
//     },
//     xaxis: {
//       categories: [
//         "Ocak",
//         "Subat",
//         "Mart",
//         "Nisan",
//         "Mayis",
//         "Haziran",
//         "Temmuz",
//         "Agostus",
//         "Eylul",
//         "Ekim",
//         "Kasim",
//         "Aralik",
//       ],
//     },
//   });

//   const [series, setSeries] = useState([
//     {
//       name: "series-1",
//       data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 132, 21, 2],
//     },
//   ]);

//   return (
//     <Chart
//       options={options}
//       series={series}
//       type="bar"
//       width={500}
//       height={320}
//     />
//   );
// };

// export default App;
"use client";
import React from "react";
import { nameState } from "./states";
import { useRecoilState } from "recoil";
function page() {
  const [name, setName] = useRecoilState(nameState);
  console.log(name[10]);

  return (
    <>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Write Your Name !"
        name=""
        id=""
      />
    </>
  );
}

export default page;
