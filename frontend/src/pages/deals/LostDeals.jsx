import React from "react";
const data = [
  { id: 1, company: "QuickMart", value: "₹90,000", owner: "Neha" },
];

const LostDeals = () => {
  return (
    <div style={styles.col}>
      <h3 style={styles.title}>🔴 Lost Deals</h3>
      {data.map((d) => (
        <div key={d.id} style={styles.card}>
          <b>{d.company}</b>
          <p>{d.value}</p>
          <small>Owner: {d.owner}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  col: {
    background: "#2b0f0f",
    padding: "12px",
    borderRadius: "10px",
  },
  title: { color: "#ef4444" },
  card: {
    background: "#450a0a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "#fee2e2",
  },
};

export default LostDeals;