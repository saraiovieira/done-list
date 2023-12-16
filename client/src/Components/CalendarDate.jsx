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
    <>
      <h3 className="calendar_title">Choose a date</h3>
      <div>
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