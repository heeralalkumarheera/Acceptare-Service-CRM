import React from "react";
import "./expenses.css";

const Expenses = () => {
  const expenses = [
    {
      id: 1,
      category: "Travel",
      amount: "₹2,500",
      date: "02 Jan 2025",
      paidBy: "Company",
    },
    {
      id: 2,
      category: "Internet",
      amount: "₹1,200",
      date: "01 Jan 2025",
      paidBy: "Employee",
    },
    {
      id: 3,
      category: "Office Supplies",
      amount: "₹850",
      date: "03 Jan 2025",
      paidBy: "Company",
    },
  ];

  return (
    <div className="expenses-page">
      <h1 className="page-title">Expenses</h1>

      <div className="card">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Paid By</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.paidBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;