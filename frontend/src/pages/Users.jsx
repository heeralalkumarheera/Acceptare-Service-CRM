import React from "react";
const User = () => {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
      <h2 style={{ marginBottom: "15px" }}>Users & Roles</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>Riya Kumari</td>
            <td style={tdStyle}>riya@atplcrm.com</td>
            <td style={tdStyle}>Admin</td>
            <td style={tdStyle}>Active</td>
          </tr>

          <tr>
            <td style={tdStyle}>Amit Singh</td>
            <td style={tdStyle}>amit@atplcrm.com</td>
            <td style={tdStyle}>Manager</td>
            <td style={tdStyle}>Active</td>
          </tr>

          <tr>
            <td style={tdStyle}>Neha Sharma</td>
            <td style={tdStyle}>neha@atplcrm.com</td>
            <td style={tdStyle}>User</td>
            <td style={tdStyle}>Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "12px",
  fontWeight: "600",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
};

export default User;
