import React, { useState, useEffect } from "react";


const defaultData = [
  { id: 1, quantity: 500, date: "2025-09-25", time: "08:30" },
  { id: 2, quantity: 750, date: "2025-09-25", time: "12:00" },
  { id: 3, quantity: 600, date: "2025-09-23", time: "09:15" },
  { id: 4, quantity: 800, date: "2025-09-22", time: "14:45" },
  { id: 5, quantity: 300, date: "2025-09-21", time: "13:45" },
];

export default function WaterList({ waterEntries, setWaterEntries }) {
  const [waterData, setWaterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [editingId, setEditingId] = useState(null); // ID of the row being edited
  const [editQuantity, setEditQuantity] = useState(""); // new quantity value


//  defaultData on first load itself
useEffect(() => {
  if (waterEntries.length === 0) {
    setWaterData(defaultData);
    setWaterEntries(defaultData);
    localStorage.setItem("waterEntries", JSON.stringify(defaultData));
  }
}, [waterEntries, setWaterEntries]);

//  Update waterData whenever waterEntries change
useEffect(() => {
  setWaterData(waterEntries);
}, [waterEntries]);

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = waterData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(waterData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    else alert("No more pages!");
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    else alert("No previous page!");
  };

  
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditQuantity(item.quantity);
  };

 const handleSave = (id) => {
  const updatedData = waterData.map((item) =>
    item.id === id ? { ...item, quantity: Number(editQuantity) } : item
  );
  setWaterData(updatedData);
  setWaterEntries(updatedData);
  localStorage.setItem("waterEntries", JSON.stringify(updatedData));
  setEditingId(null);
};


const handleDelete = (id) => {
  const updatedData = waterData.filter((item) => item.id !== id);
  setWaterData(updatedData);
  setWaterEntries(updatedData);
  localStorage.setItem("waterEntries", JSON.stringify(updatedData));
};


  return (
    <div >
      <h2>My Water Intake List</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quantity (ml)</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                {editingId === item.id ? (
                  <button className="btn btn-primary mt-2" onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button className="btn btn-primary mt-2" onClick={() => handleEdit(item)}>Edit</button>
                )}
                <button className="btn btn-primary mt-2" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button className="btn btn-dark mt-2" onClick={handlePrev} style={{ marginRight: "10px" }}>
          Prev
        </button>
        <button className="btn btn-dark mt-2" onClick={handleNext}>Next</button>
      </div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
