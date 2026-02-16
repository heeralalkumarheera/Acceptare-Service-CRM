import React from "react";

const StatusBadge = ({ status }) => {
  const style =
    status === "Active" || status === "Won"
      ? active
      : status === "Inactive" || status === "Lost"
      ? inactive
      : neutral;

  return <span style={style}>{status}</span>;
};

const active = {
  background: "#022c22",
  color: "#22c55e",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const inactive = {
  background: "#2b0f0f",
  color: "#ef4444",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const neutral = {
  background: "#1e293b",
  color: "#e5e7eb",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

export default StatusBadge;