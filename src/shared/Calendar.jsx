import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    // Chuẩn hóa ngày bằng cách đặt giờ thành 12:00 trưa để tránh vấn đề múi giờ
    const normalizedDate = new Date(date);
    normalizedDate.setHours(12, 0, 0, 0);
    
    setSelectedDate(normalizedDate);
    onDateChange(normalizedDate);
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
