import React from "react";

const ActivityCalendar = () => {
  const calendarData = [
    { date: "24 Dec", activity: "Meeting - JHGJ" },
    { date: "25 Dec", activity: "Call - Follow up" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Activity Calendar</h2>

      <div style={calendarGrid}>
        {calendarData.map((item, index) => (
          <div key={index} style={calendarCard}>
            <h4>{item.date}</h4>
            <p>{item.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- styles ---------- */

const calendarGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const calendarCard = {
  padding: "15px",
  borderRadius: "10px",
  background: "#f8fafc",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default ActivityCalendar;
