import React from "react";
import { useLocation, NavLink } from "react-router-dom";

export default function SubSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sub-sidebar">
      {pathname.startsWith("/leads") && (
        <>
          <NavLink to="/leads">All Leads</NavLink>
          <NavLink to="/leads/groups">Lead Groups</NavLink>
          <NavLink to="/leads/sources">Lead Sources</NavLink>
        </>
      )}

      {pathname.startsWith("/deals") && (
        <>
          <NavLink to="/deals/open">Open Deals</NavLink>
          <NavLink to="/deals/won">Won Deals</NavLink>
          <NavLink to="/deals/lost">Lost Deals</NavLink>
        </>
      )}
    </aside>
  );
}