import React from "react";
const DealCard = ({ title, value, owner }) => {
  return (
    <div style={card}>
      <h4>{title}</h4>
      <p style={{ color: "#94a3b8" }}>{value}</p>
      <small style={{ color: "#64748b" }}>Owner: {owner}</small>
    </div>
  );
};

const card = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  padding: "12px",
  marginBottom: "12px",
  boxShadow: "0 0 10px rgba(56,189,248,0.15)",
};

export default DealCard;