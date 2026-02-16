import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const stages = ["Qualified", "Proposal", "Negotiation", "Won"];

const DealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deal = {
    id,
    name: "Website Project",
    value: 50000,
    owner: "Amit Sharma",
    stage: "Proposal",
    organization: "TechNova",
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{deal.name}</h2>
      <p><b>Organization:</b> {deal.organization}</p>
      <p><b>Owner:</b> {deal.owner}</p>
      <p><b>Value:</b> ₹{deal.value}</p>

      <h3>Pipeline</h3>
      <div style={{ display: "flex", gap: 10 }}>
        {stages.map((s) => (
          <div
            key={s}
            style={{
              padding: "10px 14px",
              borderRadius: 20,
              background: s === deal.stage ? "#1976d2" : "#eee",
              color: s === deal.stage ? "#fff" : "#000",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealDetails;