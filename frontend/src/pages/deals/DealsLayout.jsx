import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DealsLayout = () => {
  return (
    <div>
      <h2>Deals</h2>

      <div style={{ marginBottom: "15px" }}>
        <NavLink to="pipeline" style={{ marginRight: "15px" }}>
          Pipeline
        </NavLink>
        <NavLink to="open" style={{ marginRight: "15px" }}>
          Open
        </NavLink>
        <NavLink to="won" style={{ marginRight: "15px" }}>
          Won
        </NavLink>
        <NavLink to="lost">
          Lost
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default DealsLayout;