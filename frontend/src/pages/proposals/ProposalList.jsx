import React from "react";

const ProposalList = () => {
  const proposals = [
    {
      id: 1,
      subject: "Website Development",
      status: "Accepted",
      owner: "General Manager",
      date: "04-11-2024",
    },
    {
      id: 2,
      subject: "CRM Setup",
      status: "Rejected",
      owner: "Sales Lead",
      date: "05-11-2024",
    },
  ];

  return (
    <div>
      <h2>Proposal List</h2>

      <table style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p.id}>
              <td>{p.subject}</td>
              <td>{p.status}</td>
              <td>{p.owner}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalList;
