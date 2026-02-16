import React from "react";
const data = [
  { id: 1, company: "FinEdge", value: "₹2,40,000", owner: "Riya" },
];

const WonDeals = () => {
  return (
    <div style={styles.col}>
      <h3 style={styles.title}>🟢 Won Deals</h3>
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
    background: "#062e23",
    padding: "12px",
    borderRadius: "10px",
  },
  title: { color: "#22c55e" },
  card: {
    background: "#064e3b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "#ecfdf5",
  },
};

export default WonDeals;