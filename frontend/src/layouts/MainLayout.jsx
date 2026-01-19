import React from "react";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          height: "100vh",
          background: "#1e293b",
          padding: "20px",
          color: "#fff",
        }}
      >
        <h3>ATPL CRM</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/" style={{ color: "#fff" }}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/leads" style={{ color: "#fff" }}>
              Lead Groups
            </Link>
          </li>

          <li>
            <Link to="/invoices" style={{ color: "#fff" }}>
              Invoices
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

export default MainLayout;
