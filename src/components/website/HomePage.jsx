"use client";
import React, { useEffect } from "react";
import Header from "../website/Header";
import Plans from "./Plans";
import Ads from "./Ads";
import Products from "./Products";
import Trainers from "./Trainers";
import "../website/helper.css";
function HomePage() {
  return (
    <>
      <Header />
      <Plans />
      <Ads />
      <Products />
      <Trainers />
    </>
  );
}

export default HomePage;
