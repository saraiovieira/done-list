import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarDate = ({ dateChanged }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dateChanged(date.getTime());
  }, [date, dateChanged]);

  return (
    <>
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
