import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Leads() {
  return (
    <>
      <h2>Leads</h2>
      <NavLink to="persons">Persons</NavLink> |{" "}
      <NavLink to="organizations">Organizations</NavLink>
      <Outlet />
    </>
  );
}