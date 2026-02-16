import React from "react";
const data = [
  { id: 1, company: "TechNova", value: "₹1,20,000", owner: "Riya" },
  { id: 2, company: "BlueSoft", value: "₹75,000", owner: "Aman" },
];

const OpenDeals = () => {
  return (
    <div style={styles.col}>
      <h3 style={styles.title}>🟡 Open Deals</h3>
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
    background: "#111827",
    padding: "12px",
    borderRadius: "10px",
  },
  title: { color: "#facc15" },
  card: {
    background: "#1f2933",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "#fff",
  },
};

export default OpenDeals;