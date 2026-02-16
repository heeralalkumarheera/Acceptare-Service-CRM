import React from "react";
const personsData = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit@gmail.com",
    phone: "9876543210",
    organization: "ATPL Pvt Ltd",
    status: "Active",
  },
  {
    id: 2,
    name: "Riya Verma",
    email: "riya@gmail.com",
    phone: "9123456780",
    organization: "Blade Tech",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul@gmail.com",
    phone: "9988776655",
    organization: "Acceptare",
    status: "Active",
  },
];

export default function Persons() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Persons</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Phone</th>
            <th style={th}>Organization</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {personsData.map((p) => (
            <tr key={p.id}>
              <td style={td}>{p.name}</td>
              <td style={td}>{p.email}</td>
              <td style={td}>{p.phone}</td>
              <td style={td}>{p.organization}</td>
              <td style={td}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};