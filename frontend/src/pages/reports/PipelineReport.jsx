import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const pipeline = [
  { stage: "Lead", count: 40 },
  { stage: "Qualified", count: 25 },
  { stage: "Proposal", count: 15 },
  { stage: "Negotiation", count: 8 },
  { stage: "Won", count: 6 },
];

const PipelineReport = () => {
  const data = {
    labels: pipeline.map(p => p.stage),
    datasets: [
      {
        label: "Deals in Pipeline",
        data: pipeline.map(p => p.count),
        backgroundColor: "#9b59b6",
      },
    ],
  };

  return (
    <div>
      <h2>Pipeline Report</h2>

      <div style={{ width: "500px", marginBottom: "30px" }}>
        <Bar data={data} />
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Deals</th>
          </tr>
        </thead>
        <tbody>
          {pipeline.map((p, i) => (
            <tr key={i}>
              <td>{p.stage}</td>
              <td>{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PipelineReport;