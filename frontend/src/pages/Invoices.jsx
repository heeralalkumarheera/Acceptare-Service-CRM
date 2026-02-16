import React from "react";
import "./invoices.css";

const invoices = [
  {
    id: "INV-101",
    client: "ABC Pvt Ltd",
    amount: "₹25,000",
    status: "Paid",
  },
  {
    id: "INV-102",
    client: "XYZ Solutions",
    amount: "₹18,500",
    status: "Pending",
  },
  {
    id: "INV-103",
    client: "TechNova",
    amount: "₹32,000",
    status: "Overdue",
  },
];

export default function Invoices() {
  return (
    <div className="invoices">
      <h2>Invoices</h2>

      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.client}</td>
              <td>{inv.amount}</td>
              <td>
                <span className={`status ${inv.status.toLowerCase()}`}>
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}