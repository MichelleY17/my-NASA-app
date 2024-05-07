import { useState, useEffect } from "react";

const DateNavigation = () => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  const handleDate = (direction) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + direction);
    setDate(newDate);
  };

  useEffect(() => {
    setFormattedDate(
      date.toLocaleDateString("it-IT", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [date]);

  return (
    <div className="date-navigation">
      <button onClick={() => handleDate(-1)}>prev</button>
      <span>{formattedDate}</span>
      <button onClick={() => handleDate(1)}>next</button>
    </div>
  );
};

export default DateNavigation;