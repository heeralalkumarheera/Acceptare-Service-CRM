import React from "react";
import DealCard from "./DealCard";

const DealsPipeline = () => {
  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Deals Pipeline</h2>

      <div style={board}>
        <Column title="🟡 Open">
          <DealCard title="Website Redesign" value="₹50,000" owner="Riya" />
          <DealCard title="CRM Setup" value="₹75,000" owner="Aman" />
        </Column>

        <Column title="🔵 Negotiation">
          <DealCard title="Mobile App" value="₹1,20,000" owner="Neha" />
        </Column>

        <Column title="🟢 Won">
          <DealCard title="E-commerce Store" value="₹90,000" owner="Riya" />
        </Column>

        <Column title="🔴 Lost">
          <DealCard title="ERP System" value="₹2,00,000" owner="Rahul" />
        </Column>
      </div>
    </div>
  );
};

const Column = ({ title, children }) => (
  <div style={column}>
    <h4 style={{ marginBottom: "12px" }}>{title}</h4>
    {children}
  </div>
);

const board = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
};

const column = {
  background: "#edeef3ff",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  padding: "12px",
  minHeight: "400px",
};

export default DealsPipeline;