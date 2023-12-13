import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { BsCalendar } from "react-icons/bs"; // Import the calendar icon

const CalendarDate = ({ dateChanged }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

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
      <button className="calendar-button" onClick={handleCalendarToggle}>
        Change the date
        <BsCalendar size={20} style={{ marginRight: 5 }} />
      </button>
      {showCalendar && (
        <div>
          <Calendar
            onChange={setDate}
            value={date}
            locale="en"
            calendarType="ISO 8601"
          />
        </div>
      )}
    </>
  );
};

export default CalendarDate;