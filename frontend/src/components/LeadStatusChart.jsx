import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "New", value: 40 },
  { name: "Contacted", value: 30 },
  { name: "Converted", value: 22 },
];

const COLORS = ["#2563eb", "#16a34a", "#ea580c"];

export default function LeadStatusChart() {
  return (
    <>
      <h3>Lead Status</h3>
      <ResponsiveContainer width="100%" height={230}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}