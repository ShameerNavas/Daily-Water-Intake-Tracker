import React, { useState, useEffect } from "react";

export default function WaterFilter() {
  const [userIntake, setUserIntake] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalIntake, setTotalIntake] = useState(null);

  useEffect(() => {
    // Fetch intake data from localStorage 
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const allData = JSON.parse(localStorage.getItem("waterData")) || {};
      const userData = allData[user.email] || [];
      setUserIntake(userData);
    }
  }, []);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    // conversion
    const filteredEntries = userIntake.filter((entry) => {
      const entryDate = entry.date.split("T")[0]; // convert ISO string to "YYYY-MM-DD"
      return entryDate >= startDate && entryDate <= endDate;
    });

    // calculation
    const sum = filteredEntries.reduce((acc, entry) => acc + Number(entry.quantity), 0);
    setTotalIntake(sum);
  };

  return (
    <div className="container mt-4">
      <h2>Water Intake Between Two Dates</h2>
      <div className="row mb-3">
        <div className="col">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mb-3" onClick={calculateDifference}>
        Calculate Total Intake
      </button>

      {totalIntake !== null && (
        <div className="alert alert-info">
          Total water intake from {startDate} to {endDate}: {totalIntake} ml
        </div>
      )}
    </div>
  );
}
