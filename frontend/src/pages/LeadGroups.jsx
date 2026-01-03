import React from "react";

const LeadGroups = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lead Groups</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Description</th>
            <th>Total Leads</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hot Leads</td>
            <td>High priority prospects</td>
            <td>24</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeadGroups;
