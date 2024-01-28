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
      <table>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Package</th>
          <th>Paid</th>
          <th>Should Pay</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Days Left</th>
        </tr>
        {AllCustomers.map(c => <tr>
          <td>{c.name + c.surname}</td>
          <td>{c.age}</td>
          <td>{c.gender == 'Male' ? 'M' : 'F'}</td>
          <td>{c.bucketPrice}</td>
          <td>{c.paymentAmount}</td>
          <td>{c.bucketPrice - c.paymentAmount}</td>
          <td>{c.startedAt.toDateString()}</td>
          <td>{c.endsAt.toDateString()}</td>
          <td>idk</td>
        </tr>)}
      </table>
    </>
  );
}

export default page;
