import React, { useEffect, useState, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarDate = ({ dateChanged }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token === "guest") {
    const selectedDate = date.toLocaleDateString();
    dateChanged(selectedDate);
    } else {
      dateChanged(date.getTime());
    }
  }, [date]);
  
  return (
    <>
      <div className="calendar">
        <Calendar
          onChange={setDate}
          value={date}
          locale="en"
          calendarType="ISO 8601"
        />
      </div>
    </>
  );
};

export default CalendarDate;