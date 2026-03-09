import React, { useState } from "react";

export default function WaterIntake({ waterEntries, setWaterEntries }) {

  const [quantity, setQuantity] = useState("");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity) return alert("Enter water quantity");

    const waterData = JSON.parse(localStorage.getItem("waterData")) || {};
    const today = new Date().toISOString().split("T")[0];

    if (waterData[user.email]?.some(entry => entry.date.startsWith(today))) {
      return alert("You have already added water for today!");
    }

    const newEntry = { 
      id: Date.now(), 
      quantity: quantity, 
      date: new Date().toISOString(), 
      type: "Normal", 
      status: "Done" 
    };

    waterData[user.email] = waterData[user.email] ? [...waterData[user.email], newEntry] : [newEntry];
    localStorage.setItem("waterData", JSON.stringify(waterData));
        const updatedEntries = [...waterEntries, newEntry];
    setWaterEntries(updatedEntries);
    localStorage.setItem("waterEntries", JSON.stringify(updatedEntries));

    setQuantity("");
    alert("Water added successfully!");
  };

  return (
    <div>
      <h2>Add Daily Water Intake</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-control" placeholder="Enter quantity (ml)" />
        </div><br></br>
        <button type="submit" className="btn btn-primary mt-2">Add Water</button>
      </form>
    </div>
  );
}
