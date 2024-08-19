import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

const Calendar = ({ onDateChange }) => {
  const getUTCDate = (date) => {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  const [selectedDate, setSelectedDate] = useState(new Date(new Date().toISOString()));

  console.log("selectedDate", selectedDate);

  const handleDateChange = (date) => {
    const utcDate = getUTCDate(date);
    setSelectedDate(utcDate);
    onDateChange(utcDate);
  };

  const currentDate = new Date(new Date().toISOString());

  return (
    <div className="calendar">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="border rounded"
        maxDate={currentDate}
      />
    </div>
  );
};

export default Calendar;
