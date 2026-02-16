import React from "react";
export default function CreateUser() {
  return (
    <div className="card">
      <h3>Create User</h3>

      <input placeholder="Name" />
      <input placeholder="Email" />

      <select>
        <option>Admin</option>
        <option>Manager</option>
        <option>Sales</option>
      </select>

      <button>Create</button>
    </div>
  );
}