import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAllCustomers, getTotalIncome } from "../../app/api/v1/customer";
import { getTotalSalaries } from "../../app/api/v1/user";

function MoneyStats() {
  const [selectedOptionMoney, setSelectedOption] = useState("TL");
  const [INcome, setIncome] = useState();
  const [Month, setMonth] = useState("Total");
  const [customers, setAllCustomers] = useState();
  const [monthNumber, setMonthNumber] = useState("Total");
  const [salaries, setSalaries] = useState("");
  const [moneyOfSelectedMonth, setMoneyOfSelectedMonth] = useState();
  const [incomesArray, setIncomeArray] = useState([
    // { Total: 1992000, January: 23200, February: 232300, March: 622100 },
  ]);

  useEffect(() => {
    getTotalIncome().then((i) => {
      if (i === "error" || i === "unauthorized")
        console.log("failed to fetch income: " + i);
      else setIncomeArray([{ January: 0, February: 0, March: 0, Total: i }]);
    });

    getTotalSalaries().then((s) => {
      if (s === "error" || s === "unauthorized") {
        return;
      } else setSalaries(s);
    });
  }, [monthNumber]);

  useEffect(() => {
    getAllCustomers()
      .then((res) => {
        setAllCustomers(res);
        for (let i = 0; i < res.length; i++) {
          if (new Date(res[i].createdAt).getMonth() === Number(monthNumber)) {
            setMoneyOfSelectedMonth(0 + res[i].paymentAmount);
          }

          if (new Date(res[i].createdAt).getMonth() !== Number(monthNumber)) {
            setMoneyOfSelectedMonth(0);
          }

          if (monthNumber === "Total") {
            setMoneyOfSelectedMonth(0 + res[i].paymentAmount);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [monthNumber]);

  useEffect(() => {
    const findIncome = () => {
      const income = incomesArray.length ? incomesArray[0][Month] : 0;
      setIncome(income);
    };

    findIncome();
  }, [Month, incomesArray, salaries]);

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
                setMonth(val.target.options[val.target.selectedIndex].text);
                setMonthNumber(val.target.value);
              }}
              className=" outline-none bg-orange-100 px-3 h-[30px] m-2 overflow-scroll rounded-lg"
              name="monthes"
              id=""
            >
              <option className="text-black" selected value="Total">
                Tümü
              </option>
              <option className="text-black" value="0">
                Ocak
              </option>{" "}
              <option className="text-black" value="1">
                Şubat
              </option>{" "}
              <option className="text-black" value="2">
                Mart
              </option>{" "}
              <option className="text-black" value="3">
                Nisan
              </option>{" "}
              <option className="text-black" value="4">
                Mayıs
              </option>{" "}
              <option className="text-black" value="5">
                Haziran
              </option>{" "}
              <option className="text-black" value="6">
                Temmuz
              </option>{" "}
              <option className="text-black" value="7">
                Ağustos
              </option>{" "}
              <option className="text-black" value="8">
                Eylül
              </option>{" "}
              <option className="text-black" value="9">
                Ekim
              </option>{" "}
              <option className="text-black" value="10">
                Kasım
              </option>{" "}
              <option className="text-black" value="11">
                Aralık
              </option>
            </select>{" "}
          </div>
          <p className="text-center flex items-center justify-center h-[50%] font-bold text-[40px] text-white">
            <span className="mr-1 text-[#ffcb00]">
              {" "}
              <CountUp duration={0.7} end={moneyOfSelectedMonth} />
            </span>{" "}
            <span className="text-[#ffcb00]">{selectedOptionMoney}</span>
          </p>
          <p className="text-center text-[22px] font-bold text-white ">
            {Month === "Total" ? (
              "Total income"
            ) : (
              <>
                <span>
                  The income of <span className="text-[#ffcb00]">{Month}</span>
                </span>
              </>
            )}
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
