import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const dealsData = [
  { id: 1, name: "Website Project", amount: 50000, status: "Won" },
  { id: 2, name: "CRM Software", amount: 75000, status: "In Progress" },
  { id: 3, name: "Mobile App", amount: 30000, status: "Lost" },
  { id: 4, name: "SEO Project", amount: 20000, status: "Won" },
  { id: 5, name: "ERP Tool", amount: 90000, status: "In Progress" },
];

const DealsReport = () => {
  const [filter, setFilter] = useState("All");

  const won = dealsData.filter(d => d.status === "Won").length;
  const lost = dealsData.filter(d => d.status === "Lost").length;
  const progress = dealsData.filter(d => d.status === "In Progress").length;

  const filteredDeals =
    filter === "All"
      ? dealsData
      : dealsData.filter(d => d.status === filter);

  const chartData = {
    labels: ["Won", "Lost", "In Progress"],
    datasets: [
      {
        data: [won, lost, progress],
        backgroundColor: ["#2ecc71", "#e74c3c", "#f1c40f"],
      },
    ],
  };

  const chartOptions = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selected = chartData.labels[index];
        setFilter(selected);
      }
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Deals Report</h2>

      <p>
        <b>Filter:</b> {filter}
        {filter !== "All" && (
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setFilter("All")}
          >
            Clear
          </button>
        )}
      </p>

      {/* Chart */}
      <div style={{ width: "320px", marginBottom: "30px" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Deal Name</th>
            <th>Amount (₹)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredDeals.map((deal) => (
            <tr key={deal.id}>
              <td>{deal.id}</td>
              <td>{deal.name}</td>
              <td>{deal.amount}</td>
              <td>{deal.status}</td>
            </tr>
          ))}

          {filteredDeals.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                No deals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DealsReport;