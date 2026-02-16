import React from "react";
import "./Invoices.css";

const invoices = [
  {
    id: "INV123147",
    deal: "Quas quasi libero",
    status: "Unpaid",
    method: "UPI",
    amount: "₹24,388",
  },
  {
    id: "INV123148",
    deal: "CRM Dashboard",
    status: "Paid",
    method: "Card",
    amount: "₹18,000",
  },
  {
    id: "INV123149",
    deal: "Website Lead",
    status: "Partial",
    method: "Net Banking",
    amount: "₹10,500",
  },
];

export default function Invoices() {
  return (
    <div className="invoice-page">
      <h2>Invoices</h2>

      <button className="create-btn">+ Create Invoice</button>

      {/* SUMMARY */}
      <div className="invoice-cards">
        <div className="card blue">
          <p>Total Amount</p>
          <h3>₹17,18,559</h3>
        </div>
        <div className="card green">
          <p>Total Paid</p>
          <h3>₹15,71,897</h3>
        </div>
        <div className="card orange">
          <p>Total Unpaid</p>
          <h3>₹1,46,662</h3>
        </div>
      </div>

      {/* LIST */}
      <div className="invoice-list">
        {invoices.map((inv) => (
          <div key={inv.id} className="invoice-item">
            <p><b>Invoice:</b> {inv.id}</p>
            <p><b>Deal:</b> {inv.deal}</p>
            <p><b>Payment:</b> {inv.method}</p>
            <p><b>Amount:</b> {inv.amount}</p>
            <span className={`status ${inv.status.toLowerCase()}`}>
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}