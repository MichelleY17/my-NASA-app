import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DateNavigation = ({setCurrentDate}) => {
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
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setCurrentDate(date);
  }, [date]);

  return (
    <div className="date-navigation">
      <button  className="btn-left" onClick={() => handleDate(-1)}> <FaArrowLeft /></button>
      <span>{formattedDate}</span>
      <button className="btn-right" onClick={() => handleDate(1)}> <FaArrowRight /></button>
    </div>
  );
};

export default DateNavigation;