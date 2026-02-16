import React from "react";
import "./followups.css";

const FollowUps = () => {
  const followUpsData = [
    {
      id: 1,
      customer: "Rohit Kumar",
      purpose: "Product Demo",
      followUpDate: "05 Jan 2025",
      assignedTo: "Sales Team",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Neha Singh",
      purpose: "Payment Reminder",
      followUpDate: "04 Jan 2025",
      assignedTo: "Accounts",
      status: "Completed",
    },
    {
      id: 3,
      customer: "Aman Verma",
      purpose: "Proposal Discussion",
      followUpDate: "06 Jan 2025",
      assignedTo: "Business Dev",
      status: "Scheduled",
    },
  ];

  return (
    <div className="followups-page">
      <h1 className="page-title">Follow Ups</h1>

      <div className="card">
        <table className="followups-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Purpose</th>
              <th>Follow-up Date</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {followUpsData.map((item) => (
              <tr key={item.id}>
                <td>{item.customer}</td>
                <td>{item.purpose}</td>
                <td>{item.followUpDate}</td>
                <td>{item.assignedTo}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowUps;