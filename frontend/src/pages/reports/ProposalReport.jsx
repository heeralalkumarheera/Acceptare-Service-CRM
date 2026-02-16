import React from"react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const proposals = [
  { id: 1, client: "ABC Pvt Ltd", amount: 50000, status: "Sent" },
  { id: 2, client: "XYZ Solutions", amount: 75000, status: "Approved" },
  { id: 3, client: "TechSoft", amount: 30000, status: "Pending" },
];

const ProposalReport = () => {
  const chartData = {
    labels: ["Sent", "Approved", "Pending"],
    datasets: [
      {
        label: "Proposals Count",
        data: [
          proposals.filter(p => p.status === "Sent").length,
          proposals.filter(p => p.status === "Approved").length,
          proposals.filter(p => p.status === "Pending").length,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f"],
      },
    ],
  };

  return (
    <div>
      <h2>Proposal Report</h2>

      <div style={{ width: "400px", marginBottom: "30px" }}>
        <Bar data={chartData} />
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Client</th>
            <th>Amount ₹</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map(p => (
            <tr key={p.id}>
              <td>{p.client}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalReport;
