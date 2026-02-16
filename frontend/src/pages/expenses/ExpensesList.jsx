import React from "react";
import "../../styles/common.css";

const Expenses = () => {
  const expenses = [
    { title: "Fuel", amount: 1200, date: "2026-01-01" },
    { title: "Internet", amount: 799, date: "2026-01-03" },
  ];

  return (
    <div className="page">
      <h2>Expenses</h2>
      <p>Track daily and monthly expenses</p>

      <table>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, i) => (
            <tr key={i}>
              <td>{exp.title}</td>
              <td>₹ {exp.amount}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
