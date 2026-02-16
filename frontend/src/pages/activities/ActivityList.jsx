import React, { useState } from "react";

const ActivityList = () => {
  const [activities] = useState([
    {
      id: 1,
      type: "Meeting",
      title: "JHGJ",
      relatedTo: "Person - 123456",
      owner: "TRAORE SOLO",
      start: "24.12.2025 1:06 PM",
      end: "24.12.2025 1:21 PM",
    },
    {
      id: 2,
      type: "Call",
      title: "Follow up",
      relatedTo: "Deal - 789012",
      owner: "TRAORE SOLO",
      start: "25.12.2025 10:00 AM",
      end: "25.12.2025 10:15 AM",
    },
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Activity List</h2>
        <button style={btnPrimary}>Add Activity</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Title</th>
            <th>Related To</th>
            <th>Owner</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td style={{ color: "#2563eb" }}>{item.title}</td>
              <td>{item.relatedTo}</td>
              <td>{item.owner}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---------- styles ---------- */

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
};

const btnPrimary = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ActivityList;
