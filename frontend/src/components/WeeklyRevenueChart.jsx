import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 15000 },
  { day: "Wed", revenue: 11000 },
  { day: "Thu", revenue: 18000 },
  { day: "Fri", revenue: 20000 },
  { day: "Sat", revenue: 17000 },
];

export default function WeeklyRevenueChart() {
  return (
    <>
      <h3>Weekly Revenue</h3>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}