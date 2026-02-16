import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const UsersRolesLayout = () => {
  return (
    <div>
      <h2>Users & Roles</h2>

      {/* Top Tabs */}
      <div style={{ marginBottom: "15px" }}>
        <NavLink
          to="/dashboard/users"
          style={{ marginRight: 10 }}
        >
          Users
        </NavLink>

        <NavLink to="/dashboard/users/roles">
          Roles
        </NavLink>
      </div>

      <hr />

      {/* Right side content will render here */}
      <Outlet />
    </div>
  );
};

export default UsersRolesLayout;