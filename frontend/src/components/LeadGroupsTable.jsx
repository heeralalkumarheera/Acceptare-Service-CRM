import React from "react";

const LeadGroupsTable = ({ data }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Description</th>
          <th>Total Leads</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((group) => (
          <tr key={group.id}>
            <td>{group.name}</td>
            <td>{group.description}</td>
            <td>{group.totalLeads}</td>
            <td>
              <span
                style={{
                  color:
                    group.status === "Active"
                      ? "green"
                      : group.status === "Pending"
                      ? "orange"
                      : "red",
                }}
              >
                {group.status}
              </span>
            </td>
            <td>
              <button onClick={() => alert(`Viewing ${group.name}`)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadGroupsTable;
