import React from "react";
import "../../styles/common.css";

const CallLog = () => {
  const calls = [
    { name: "Amit Sharma", number: "9876543210", status: "Completed" },
    { name: "Neha Singh", number: "9123456789", status: "Pending" },
  ];

  return (
    <div className="page">
      <h2>Call Logs</h2>
      <p>Track all outbound and inbound calls</p>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call, i) => (
            <tr key={i}>
              <td>{call.name}</td>
              <td>{call.number}</td>
              <td>
                <span className={`badge ${call.status.toLowerCase()}`}>
                  {call.status}
                </span>
              </td>
              <td>
                <button className="btn">Call</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallLog;
