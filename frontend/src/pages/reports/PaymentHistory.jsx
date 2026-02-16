import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const payments = [
  { date: "Jan", amount: 20000 },
  { date: "Feb", amount: 45000 },
  { date: "Mar", amount: 30000 },
  { date: "Apr", amount: 60000 },
];

const PaymentHistory = () => {
  const data = {
    labels: payments.map(p => p.date),
    datasets: [
      {
        label: "Payments Received ₹",
        data: payments.map(p => p.amount),
        borderColor: "#e67e22",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h2>Payment History</h2>

      <div style={{ width: "500px", marginBottom: "30px" }}>
        <Line data={data} />
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount ₹</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{p.date}</td>
              <td>{p.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;