import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("deals");

  const persons = [
    {
      id: "1",
      name: "Amit Sharma",
      email: "amit@company.com",
      phone: "9876543210",
      organization: "TechNova",
    },
    {
      id: "2",
      name: "Riya Verma",
      email: "riya@startup.io",
      phone: "9123456780",
      organization: "StartUp Hub",
    },
  ];

  const person = persons.find((p) => p.id === id);
  if (!person) return <h3>Person not found</h3>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{person.name}</h2>
      <p>{person.email} | {person.phone}</p>
      <p><b>Organization:</b> {person.organization}</p>

      {/* TABS */}
      <div style={tabs}>
        <button style={tabBtn(activeTab === "deals")} onClick={() => setActiveTab("deals")}>Deals</button>
        <button style={tabBtn(activeTab === "activities")} onClick={() => setActiveTab("activities")}>Activities</button>
        <button style={tabBtn(activeTab === "notes")} onClick={() => setActiveTab("notes")}>Notes</button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "deals" && <DealsTab />}
      {activeTab === "activities" && <ActivitiesTab />}
      {activeTab === "notes" && <NotesTab />}
    </div>
  );
};

/* ---------------- TAB COMPONENTS ---------------- */

const DealsTab = () => (
  <table style={table}>
    <thead>
      <tr>
        <th>Deal Name</th>
        <th>Value</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Website Project</td>
        <td>₹50,000</td>
        <td>Open</td>
      </tr>
      <tr>
        <td>Mobile App</td>
        <td>₹1,20,000</td>
        <td>Won</td>
      </tr>
    </tbody>
  </table>
);

const ActivitiesTab = () => (
  <ul>
    <li>📞 Call scheduled</li>
    <li>📧 Follow-up email sent</li>
    <li>📝 Meeting completed</li>
  </ul>
);

const NotesTab = () => (
  <textarea
    placeholder="Write notes here..."
    style={{ width: "100%", height: "100px" }}
  />
);

/* ---------------- STYLES ---------------- */

const tabs = { marginTop: 20, marginBottom: 20 };

const tabBtn = (active) => ({
  marginRight: 10,
  padding: "6px 12px",
  background: active ? "#1976d2" : "#eee",
  color: active ? "#fff" : "#000",
  border: "none",
  cursor: "pointer",
});

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default PersonDetails;