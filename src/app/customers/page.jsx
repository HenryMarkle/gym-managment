"use client";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../api/v1/customer";
import "./main.css";
import Link from "next/link";
function page() {
  const [AllCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    const getAllCust = async () => {
      const result = await getAllCustomers();
      setAllCustomers(result);
      return result;
    };
    getAllCust().then((d) => console.log(d));
  }, []);

  return (
    <>
      <div className="table-main ml-[25%] mt-5 h-[90vh] shadow-md rounded-[31px] p-4 mr-10 ">
        <div className="parent-cols grid grid-cols-9 gap-4 ">
          <div className="name-col overflow-hidden">
            <p className="mb-5">Name</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.name}</p>
                </>
              );
            })}
          </div>
          <div className="surname-col overflow-hidden">
            <p className="mb-5">surname</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.surname}</p>
                </>
              );
            })}
          </div>
          <div className="age-col overflow-hidden">
            <p className="mb-5">age</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.age}</p>
                </>
              );
            })}
          </div>
          <div className="bucketPrice-col overflow-hidden">
            <p className="mb-5">price</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.bucketPrice}</p>
                </>
              );
            })}
          </div>
          <div className="paid-col overflow-hidden">
            <p className="mb-5">Paid</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.paymentAmount}</p>
                </>
              );
            })}
          </div>
          <div className="should-pay-col overflow-hidden">
            <p className="mb-5">Should pay</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>{ele.bucketPrice - ele.paymentAmount}</p>
                </>
              );
            })}
          </div>
          <div className="started-at-col overflow-hidden">
            <p className="mb-5">Started At</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p className=" text-center">Date</p>
                </>
              );
            })}
          </div>
          <div className="ends-at-col overflow-hidden">
            {" "}
            <p className="mb-5">Ends At</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>Date</p>
                </>
              );
            })}
          </div>
          <div className="days-left-col overflow-hidden">
            <p className="mb-5">Days left</p>
            {AllCustomers.map((ele) => {
              return (
                <>
                  <p>14</p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
