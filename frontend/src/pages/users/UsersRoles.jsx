import React from "react";
import UserList from "./UsersList";
import RoleList from "./RolesList";

export default function UsersRoles() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Users & Roles</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <UserList />
        <RoleList />
      </div>
    </div>
  );
}