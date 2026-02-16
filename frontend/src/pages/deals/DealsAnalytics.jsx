import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DealsAnalytics = () => {
  const stats = [
    { title: "Open Deals", value: 12, color: "#3b82f6" },
    { title: "Negotiation", value: 5, color: "#6366f1" },
    { title: "Won Deals", value: 8, color: "#22c55e" },
    { title: "Lost Deals", value: 3, color: "#ef4444" },
  ];

  const chartData = [
    { name: "Open", count: 12 },
    { name: "Negotiation", count: 5 },
    { name: "Won", count: 8 },
    { name: "Lost", count: 3 },
  ];

  const COLORS = ["#3b82f6", "#6366f1", "#22c55e", "#ef4444"];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Deals Analytics</h2>

      {/* STAT CARDS */}
      <div style={cards}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, borderColor: s.color }}>
            <p style={{ color: "#94a3b8" }}>{s.title}</p>
            <h2 style={{ color: s.color }}>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div style={charts}>
        {/* BAR CHART */}
        <div style={chartCard}>
          <h4>Deals by Status</h4>
          <BarChart width={450} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" />
          </BarChart>
        </div>

        {/* PIE CHART */}
        <div style={chartCard}>
          <h4>Deals Distribution</h4>
          <PieChart width={300} height={250}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

const cards = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  background: "#020617",
  border: "1px solid",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 0 12px rgba(56,189,248,0.12)",
};

const charts = {
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
};

const chartCard = {
  background: "#fafbfdff",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 0 12px rgba(56,189,248,0.12)",
};

export default DealsAnalytics;