import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

const CalendarDate = ({ dateChanged }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "guest") {
      const selectedDate = date.toLocaleDateString();
      dateChanged(selectedDate);
    } else {
      dateChanged(date.getTime());
    }
  }, [date]);

  return (
    <div className="calendar__main-container">
      <h3 className="calendar_title">Choose a date</h3>
      <div className="calendar__container">
        <Calendar
          onChange={setDate}
          value={date}
          locale="en"
          calendarType="ISO 8601"
        />
      </div>
    </div>
  );
};

export default CalendarDate;