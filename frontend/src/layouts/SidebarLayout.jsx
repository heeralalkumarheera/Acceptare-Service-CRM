import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>ATPL CRM</h2>

        <NavLink to="/dashboard" style={navStyle}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/deals" style={navStyle}>
          💼 Deals
        </NavLink>

        <NavLink to="/persons" style={navStyle}>
          👥 Persons
        </NavLink>

        <div style={{ marginTop: "auto" }}>
          <button style={styles.logout}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const navStyle = ({ isActive }) => ({
  padding: "12px",
  textDecoration: "none",
  color: isActive ? "#22c55e" : "#cbd5f5",
  background: isActive ? "#1f2937" : "transparent",
  borderRadius: "8px",
  marginBottom: "6px",
  display: "block",
  fontWeight: "500",
});

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
  },
  sidebar: {
    width: "220px",
    background: "#020617",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    color: "#38bdf8",
    marginBottom: "20px",
  },
  main: {
    flex: 1,
    overflowY: "auto",
  },
  logout: {
    width: "100%",
    padding: "10px",
    background: "#7f1d1d",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default SidebarLayout;