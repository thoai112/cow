import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    // const normalizedDate = new Date(date);
    // normalizedDate.setHours(12, 0, 0, 0);
    
    // setSelectedDate(normalizedDate);
    // onDateChange(normalizedDate);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    
    setSelectedDate(utcDate);
    onDateChange(utcDate);
  };
  return (
    <div className="calendar">
      <DatePicker 
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="border rounded"
      />
    </div>
  );
};

export default Calendar;
