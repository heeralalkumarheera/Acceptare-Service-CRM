import { NavLink, Outlet } from "react-router-dom";

export default function DealsLayout() {
  return (
    <div>
      {/* SUB BAR */}
      <div style={{ display: "flex", gap: "20px", borderBottom: "1px solid #ddd" }}>
        <NavLink to="open">Open Deals</NavLink>
        <NavLink to="won">Won Deals</NavLink>
        <NavLink to="lost">Lost Deals</NavLink>
      </div>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}