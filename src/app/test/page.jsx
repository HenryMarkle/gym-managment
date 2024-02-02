"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-12-10"));

  return (
    <DatePicker
      className="ml-[20%]"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="MM/dd/yyyy"
    />
  );
};

export default DatePickerComponent;
