import React from "react";
import "./main.css";
import Link from "next/link";
function page() {
  const dammyData = [
    { id: "1", name: "Ali Haseni", salary: 1090 },
    { id: "12", name: "Ali Haseni", salary: 1090 },
    { id: "13", name: "Ali Haseni", salary: 1090 },
    { id: "14", name: "Ali Haseni", salary: 1090 },
    { id: "15", name: "Ali Haseni", salary: 1090 },
    { id: "16", name: "Ali Haseni", salary: 1090 },
    { id: "17", name: "Ali Haseni", salary: 1090 },
    { id: "18", name: "Ali Haseni", salary: 1090 },
    { id: "19", name: "Ali Haseni", salary: 1090 },
  ];
  return (
    <>
      <div className="managers ml-[27%] m-4 min-h-[700px]  relative rounded-2xl mt-20  gap-y-10  ">
        {dammyData.map((ele) => {
          return (
            <>
              <Link href={`/manager/${ele.id}`}>
                <div className="koch shadow-sm shadow-green-700  relative  h-[300px] p-2 mt-10 rounded-md">
                  <img
                    className="h-[100px] rounded-full absolute -top-12 left-[50%] transform translate-x-[-50%] border-4 border-emerald-900 z-50 outline  outline-white outline-4"
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                    alt="trainer"
                  />
                  <div className="info pt-[70px] ">
                    <p className="text-center font-bold text-[19px]">
                      {ele.name}
                    </p>
                    <div className="other-info mt-4">
                      <p>
                        <span className="font-bold text-[17px]">Salary</span> :
                        {ele.salary} TL
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}

export default page;
