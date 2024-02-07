import React from "react";
import Header from "../website/Header";
import Plans from "./Plans";
import Ads from "./Ads";
import Products from "./Products";
import "../website/helper.css";
function HomePage() {
  return (
    <>
      <Header />
      <Plans />
      <Ads />
      <Products />
    </>
  );
}

export default HomePage;
