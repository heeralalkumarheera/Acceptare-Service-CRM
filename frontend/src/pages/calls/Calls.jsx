import React from "react";
import "./calls.css";

const Calls = () => {
  const callsData = [
    {
      id: 1,
      type: "Incoming",
      person: "Kunal Sharma",
      number: "9876543210",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: 2,
      type: "Outgoing",
      person: "Priya Verma",
      number: "9123456780",
      time: "12:15 PM",
      status: "Missed",
    },
    {
      id: 3,
      type: "Incoming",
      person: "Amit Singh",
      number: "9988776655",
      time: "03:40 PM",
      status: "Scheduled",
    },
  ];

  return (
    <div className="calls-page">
      <h1 className="page-title">Calls</h1>

      <div className="card">
        <table className="calls-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {callsData.map((call) => (
              <tr key={call.id}>
                <td>{call.type}</td>
                <td>{call.person}</td>
                <td>{call.number}</td>
                <td>{call.time}</td>
                <td>
                  <span className={`status ${call.status.toLowerCase()}`}>
                    {call.status}
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

export default Calls;