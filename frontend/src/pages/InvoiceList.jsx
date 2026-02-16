import React, { useEffect, useState } from "react";
import "./invoices.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Mock API data (backend later connect hoga)
    const mockInvoices = [
      {
        id: "INV-001",
        client: "ABC Pvt Ltd",
        amount: 25000,
        status: "Paid",
      },
      {
        id: "INV-002",
        client: "XYZ Solutions",
        amount: 18000,
        status: "Pending",
      },
      {
        id: "INV-201",
        client: "Alpha Corp",
        amount: 28000,
        status: "Paid",
      },
      {
        id: "INV-202",
        client: "Beta Systems",
        amount: 16000,
        status: "Pending",
      },
      {
        id: "INV-203",
        client: "Gamma Tech",
        amount: 42000,
        status: "Overdue",
      },
      {
        id: "INV-204",
        client: "Nova Pvt Ltd",
        amount: 19000,
        status: "Paid",
      },
    ];

    setInvoices(mockInvoices);
  }, []);

  const filteredInvoices =
    filter === "All"
      ? invoices
      : invoices.filter((i) => i.status === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

      {/* FILTER BUTTONS */}
      <div className="filters">
        {["All", "Paid", "Pending", "Overdue"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredInvoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.client}</td>
              <td>₹{inv.amount}</td>
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
};

export default InvoiceList;
