import React, { useState } from "react";

const ExpenseArea = () => {
  const [areas, setAreas] = useState([
    "Housing",
    "Food",
    "IT",
    "Transport",
    "Marketing",
  ]);

  const [newArea, setNewArea] = useState("");

  const addArea = () => {
    if (newArea.trim() === "") return;
    setAreas([...areas, newArea]);
    setNewArea("");
  };

  return (
    <div style={container}>
      <h2 style={heading}>Area of Expense</h2>

      {/* Add Area */}
      <div style={formRow}>
        <input
          type="text"
          placeholder="Enter expense area"
          value={newArea}
          onChange={(e) => setNewArea(e.target.value)}
          style={input}
        />
        <button onClick={addArea} style={button}>
          Add Area
        </button>
      </div>

      {/* Area List */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Area Name</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area, index) => (
            <tr key={index}>
              <td style={td}>{index + 1}</td>
              <td style={td}>{area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ===== styles ===== */

const container = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};

const heading = {
  marginBottom: "20px",
};

const formRow = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  padding: "10px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "10px",
  background: "#f1f5f9",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};

export default ExpenseArea;
