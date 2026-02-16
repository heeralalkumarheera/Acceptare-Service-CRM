import React from "react";
import { useState } from "react";
import "./organizations.css";

const organizationsData = [
  {
    id: 1,
    name: "Alpha Corp",
    industry: "IT Services",
    owner: "Amit Kumar",
    email: "contact@alphacorp.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Beta Systems",
    industry: "Finance",
    owner: "Riya Kumari",
    email: "info@betasys.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Nova Pvt Ltd",
    industry: "Software",
    owner: "Rahul Verma",
    email: "sales@nova.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Gamma Tech",
    industry: "Electronics",
    owner: "Neha Singh",
    email: "support@gammatech.com",
    status: "Active",
  },
];

export default function Organizations() {
  const [search, setSearch] = useState("");

  const filteredOrgs = organizationsData.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="organizations">
      <h2>Organizations</h2>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="Search organization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>Industry</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrgs.map((org) => (
            <tr key={org.id}>
              <td>{org.name}</td>
              <td>{org.industry}</td>
              <td>{org.owner}</td>
              <td>{org.email}</td>
              <td>
                <span className={`status ${org.status.toLowerCase()}`}>
                  {org.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}