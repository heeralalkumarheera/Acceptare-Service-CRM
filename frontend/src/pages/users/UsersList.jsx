import React from "react";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/UserService";


const users = [
  {
    name: "Avinash Verma",
    email: "avinash@gmail.com",
    role: "App Admin",
    status: "Invited",
  },
  {
    name: "Ayesha Noor",
    email: "ayesha@gmail.com",
    role: "Manager",
    status: "Active",
  },
];

export default function UsersList() {
  return (
    <div className="card" style={{ flex: 1.2 }}>
      <div className="header">
        <h3>User List</h3>
        <button className="primary">Invite_toggle_user</button>
      </div>

      <input placeholder="Search user..." className="search" />

      {users.map((user, i) => (
        <div key={i} className="list-row">
          <div>
            <strong>{user.name}</strong>
            <div className="muted">{user.email}</div>
          </div>

          <div>
            <span className={`badge ${user.status}`}>
              {user.status}
            </span>
          </div>

          <div className="muted">{user.role}</div>

          <button className="link">⋮</button>
        </div>
      ))}
    </div>
  );
}

