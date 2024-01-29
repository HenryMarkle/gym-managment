"use client";
import React, { useState } from "react";
import { addCustomer } from "../api/v1/customer";
import "./main.css";

function page() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bucketPrice, setPucketPrice] = useState(null);
  const [payment, setPayment] = useState(0);
  const [dis, setDisabled] = useState(true);
  async function doIt() {
    const result = await addCustomer({
      name,
      surname,
      age: Number(age),
      gender,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      bucketPrice: bucketPrice,
      payment,
    });

    console.log(result);
  }

  return (
    <>
      <div className="add ml-[30%] mt-10 flex justify-between px-4 py-16 mr-[10%] shadow-xl h-[650px] rounded-xl">
        <div className="left w-[45%]">
          <div className="start-date flex-col flex">
            <label htmlFor="">Start Date</label>
            <input
              onChange={(e) => setStartdate(e.target.value)}
              type="date"
              placeholder="Start date"
            />
          </div>
          <div className="name flex-col flex ">
            <label htmlFor="">Name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="surname flex-col flex">
            <label htmlFor="">Surname</label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              placeholder="Surname"
            />
          </div>
          <div className="age flex-col flex">
            <label htmlFor="">Age</label>
            <input
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Age"
            />
          </div>
          <div className="gender flex-col flex">
            <label htmlFor="">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              id=""
              className=" outline-none rounded-xl"
            >
              <option value="Gender">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* Duration dont forget */}
        </div>
        <div className="right w-[45%]">
          {" "}
          <div className="end-date flex-col flex">
            <label htmlFor="">End Date</label>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              placeholder="End date"
            />
          </div>
          <div className="price flex-col flex">
            <label htmlFor="pucket">Pucket price</label>
            <input
              onChange={(e) => setPucketPrice(e.target.value)}
              name="pucket-price"
              type="number"
              placeholder="pucket price"
            />
          </div>
          <div className="paid flex-col flex">
            <label>Payment</label>
            <input
              onChange={(e) => setPayment(e.target.value)}
              type="number"
              name=""
              id=""
              placeholder="Paied"
            />
          </div>
          <div className="money-left flex-col flex">
            <label> Money left</label>
            <input
              type="text"
              value={bucketPrice - payment}
              disabled
              placeholder="money left"
            />
          </div>
          <button
            disabled={dis ? true : false}
            onClick={doIt}
            className=" mt-[25px] px-9 w-full py-2 rounded-xl bg-customRed text-white font-bold text-[18px] "
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
