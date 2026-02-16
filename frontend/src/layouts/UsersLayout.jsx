import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function UsersLayout() {
  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <NavLink to="/dashboard/users">Users</NavLink>
        <NavLink to="/dashboard/users/roles">Roles</NavLink>
        <NavLink to="/dashboard/users/create">+ Add User</NavLink>
      </div>

      <hr />

      <Outlet />
    </div>
  );
}