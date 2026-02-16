import React from "react";
import "./leadGroups.css";

const LeadGroups = () => {
  const leadGroups = [
    {
      id: 1,
      name: "Website Leads",
      totalLeads: 45,
      owner: "Riya",
      status: "Active",
    },
    {
      id: 2,
      name: "Facebook Campaign",
      totalLeads: 30,
      owner: "Aman",
      status: "Active",
    },
    {
      id: 3,
      name: "Referral Leads",
      totalLeads: 18,
      owner: "Neha",
      status: "Inactive",
    },
  ];

  return (
    <div className="lead-groups-page">
      <div className="page-header">
        <h2>Lead Groups</h2>
        <button className="add-btn">+ Create Group</button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Total Leads</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leadGroups.map((group) => (
              <tr key={group.id}>
                <td>{group.name}</td>
                <td>{group.totalLeads}</td>
                <td>{group.owner}</td>
                <td>
                  <span
                    className={`status ${group.status.toLowerCase()}`}
                  >
                    {group.status}
                  </span>
                </td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadGroups;
