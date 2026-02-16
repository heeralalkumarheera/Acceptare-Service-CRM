import React from "react";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const navigate = useNavigate();

  const deals = [
    { id: 1, name: "Website Project", value: 50000, stage: "Qualified", owner: "Amit" },
    { id: 2, name: "Mobile App", value: 120000, stage: "Proposal", owner: "Riya" },
    { id: 3, name: "CRM Setup", value: 80000, stage: "Won", owner: "Karan" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Deals</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Value</th>
            <th>Stage</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((d) => (
            <tr
              key={d.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/deals/${d.id}`)}
            >
              <td>{d.name}</td>
              <td>₹{d.value}</td>
              <td>{d.stage}</td>
              <td>{d.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Deals;