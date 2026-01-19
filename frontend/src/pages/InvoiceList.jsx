import React, { useEffect, useState } from "react";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

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
    ];

    setInvoices(mockInvoices);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Invoices</h2>

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
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.client}</td>
              <td>₹{inv.amount}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
