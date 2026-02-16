import React from "react";
import { useEffect, useState } from "react";
import { getRoles } from "../../services/UserService";

const roles = [
  {
    name: "App Admin",
    description: "Full system access",
    users: 4,
  },
  {
    name: "Manager",
    description: "Leads, deals, reports",
    users: 7,
  },
  {
    name: "Agent",
    description: "Limited access",
    users: 12,
  },
];

export default function RolesList() {
  return (
    <div className="card" style={{ flex: 1 }}>
      <div className="header">
        <h3>Role List</h3>
        <button className="secondary">Create Role</button>
      </div>

      {roles.map((role, i) => (
        <div key={i} className="list-row">
          <div>
            <strong>{role.name}</strong>
            <div className="muted">{role.description}</div>
          </div>

          <div className="muted">{role.users} users</div>

          <button className="outline">View Permissions</button>
        </div>
      ))}
    </div>
  );
}