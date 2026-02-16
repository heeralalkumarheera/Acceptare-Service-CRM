import React from "react";
export default function CreateRole() {
  return (
    <div className="card">
      <h3>Create Role</h3>

      <input placeholder="Role Name" />

      <label><input type="checkbox" /> Dashboard</label>
      <label><input type="checkbox" /> Leads</label>
      <label><input type="checkbox" /> Deals</label>
      <label><input type="checkbox" /> Users</label>

      <button>Create Role</button>
    </div>
  );
}