import React from "react";
import Header from "../website/Header";
import Plans from "./Plans";
import Ads from "./Ads";
import "../website/helper.css";
function HomePage() {
  return (
    <>
      <Header />
      <Plans />
      <Ads />
    </>
  );
}

export default HomePage;
