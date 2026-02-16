import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DealsChart() {
  const data = [
    { name: "Open", value: 32 },
    { name: "Won", value: 18 },
    { name: "Lost", value: 6 },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#ef4444"];

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Deals Overview</h3>

      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}