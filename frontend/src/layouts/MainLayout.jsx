import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  FileText,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import "./layout.css";

const MainLayout = ({ children }) => {
  const [openDeals, setOpenDeals] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">ATPL CRM</div>

        <NavLink to="/dashboard" className="menu">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/persons" className="menu">
          <Users size={18} />
          <span>Persons</span>
        </NavLink>

        <NavLink to="/organizations" className="menu">
          <Building2 size={18} />
          <span>Organizations</span>
        </NavLink>

        {/* DEALS */}
        <div className="menu" onClick={() => setOpenDeals(!openDeals)}>
          <Handshake size={18} />
          <span>Deals</span>
          <ChevronDown
            size={16}
            className={openDeals ? "rotate" : ""}
          />
        </div>

        {openDeals && (
          <div className="submenu">
            <NavLink to="/deals/open" className="submenu-item">
              Open Deals
            </NavLink>
            <NavLink to="/deals/won" className="submenu-item">
              Won Deals
            </NavLink>
            <NavLink to="/deals/lost" className="submenu-item">
              Lost Deals
            </NavLink>
          </div>
        )}

        {/* REPORTS */}
        <div className="menu" onClick={() => setOpenReports(!openReports)}>
          <BarChart3 size={18} />
          <span>Reports</span>
          <ChevronDown
            size={16}
            className={openReports ? "rotate" : ""}
          />
        </div>

        {openReports && (
          <div className="submenu">
            <NavLink to="/reports/deals" className="submenu-item">
              Deals Report
            </NavLink>
            <NavLink to="/reports/proposal" className="submenu-item">
              Proposal Report
            </NavLink>
            <NavLink to="/reports/pipeline" className="submenu-item">
              Pipeline Report
            </NavLink>
            <NavLink to="/reports/payment-history" className="submenu-item">
              Payment History
            </NavLink>
          </div>
        )}

        <NavLink to="/invoices" className="menu">
          <FileText size={18} />
          <span>Invoices</span>
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
