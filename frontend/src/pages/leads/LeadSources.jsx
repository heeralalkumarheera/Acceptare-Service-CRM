import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const leadSourceData = [
  { name: "Website", value: 42 },
  { name: "Facebook Ads", value: 28 },
  { name: "Google Ads", value: 18 },
  { name: "Referral", value: 12 },
];

const COLORS = ["#00ffcc", "#ff0055", "#ffaa00", "#7c7cff"];

export default function LeadSources() {
  return (
    <div className="page">
      <h1 className="page-title">Lead Sources</h1>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">Total Leads<br /><span>100</span></div>
        <div className="stat-card">Top Source<br /><span>Website</span></div>
        <div className="stat-card">Conversion Rate<br /><span>32%</span></div>
      </div>

      {/* Chart + Table */}
      <div className="chart-grid">
        <div className="chart-box">
          <h3>Lead Source Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={leadSourceData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
              >
                {leadSourceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="table-box">
          <h3>Source Details</h3>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Leads</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Website</td>
                <td>42</td>
                <td className="success">High</td>
              </tr>
              <tr>
                <td>Facebook Ads</td>
                <td>28</td>
                <td className="warning">Medium</td>
              </tr>
              <tr>
                <td>Google Ads</td>
                <td>18</td>
                <td className="warning">Medium</td>
              </tr>
              <tr>
                <td>Referral</td>
                <td>12</td>
                <td className="danger">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}