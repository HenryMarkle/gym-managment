import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getTotalIncome } from "../../app/api/v1/user";

function MoneyStats() {
  const [selectedOptionMoney, setSelectedOption] = useState("TL");
  const [INcome, setIncome] = useState();
  const [Month, setMonth] = useState("Total");
  const [incomesArray, setIncomeArray] = useState([
    { Total: 1992000, January: 23200, February: 232300, March: 622100 },
  ]);

  useEffect(() => {
    getTotalIncome().then((i) => {
      if (i === "error" || i === "unauthorized")
        console.log("failed to fetch income: " + i);
      else setIncomeArray([{ January: 0, February: 0, March: 0, Total: i }]);
    });
  }, []);

  useEffect(() => {
    const findIncome = () => {
      const income = incomesArray[0][Month];
      setIncome(income);
      console.log(income);
    };
    findIncome();
  }, [Month]);

  return (
    <>
      <div className="right w-[30%] ">
        <div className="income-for-gym bg-customRed shadow-lg h-[300px] w-full rounded-[31px]">
          <div className="selects flex justify-between mx-4 pt-3">
            <p className=" text-center font-bold text-[30px] text-white">
              Income
            </p>
            <select
              onChange={(val) => {
                setMonth(val.target.value);
              }}
              className=" outline-none bg-orange-100 px-3 h-[30px] m-2 overflow-scroll rounded-lg"
              name="monthes"
              id=""
            >
              <option className="text-black" selected value="Total">
                Total
              </option>
              <option className="text-black" value="January">
                January
              </option>{" "}
              <option className="text-black" value="February">
                February
              </option>{" "}
              <option className="text-black" value="March">
                March
              </option>
            </select>{" "}
          </div>
          <p className="text-center flex items-center justify-center h-[50%] font-bold text-[40px] text-white">
            <span className="mr-1 text-[#ffcb00]">
              {" "}
              <CountUp duration={0.7} end={INcome} />
            </span>{" "}
            <span className="text-[#ffcb00]">{selectedOptionMoney}</span>
          </p>
          <p className="text-center text-[22px] font-bold text-white ">
            {Month === "Total" ? "Total income" : `The income of ${Month}`}
          </p>
        </div>
        <div className="Salaries-of-managers bg-customRed shadow-lg h-[300px] w-full rounded-2xl mt-4">
          <div className="selects flex justify-between mx-4 pt-3">
            <p className=" text-center font-bold text-[30px] text-white">
              Salaries
            </p>
          </div>
          <p className="text-center flex items-center justify-center h-[50%] font-bold text-[40px] text-white">
            <span className="mr-1 text-[#ffcb00]">
              {" "}
              <CountUp end={3123} />
            </span>{" "}
            <span className="text-[#ffcb00]">{selectedOptionMoney}</span>
          </p>
          <p className="p-2 m-2 text-center text-white text-[15px] font-bold">
            This Calculating the salaries of the managers which are signed in
            this system
          </p>
        </div>
      </div>
    </>
  );
}

export default MoneyStats;
