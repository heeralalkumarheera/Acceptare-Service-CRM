import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Handshake,
  FileText,
  FileSignature,
  Activity,
  IndianRupee,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  const [openLeads, setOpenLeads] = useState(false);
  const [openDeals, setOpenDeals] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [openProposals, setOpenProposals] = useState(false);
  const [openActivities, setOpenActivities] = useState(false);
  const [openExpenses, setOpenExpenses] = useState(false);

  return (
    <div className="sidebar">
      <h3 className="logo">ATPL CRM</h3>

      {/* DASHBOARD */}
      <NavLink to="/dashboard" style={link}>
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      {/* LEADS */}
      <div className="menu" onClick={() => setOpenLeads(!openLeads)}>
        <Users size={18} />
        <span>Leads</span>
        <ChevronDown size={16} />
      </div>
      {openLeads && (
        <div className="submenu">
          <NavLink to="/leads/persons">Persons</NavLink>
          <NavLink to="/leads/organizations">Organizations</NavLink>
          <NavLink to="/leads/groups">Lead Groups</NavLink>
        </div>
      )}

      {/* DEALS */}
      <div className="menu" onClick={() => setOpenDeals(!openDeals)}>
        <Handshake size={18} />
        <span>Deals</span>
        <ChevronDown size={16} />
      </div>
      {openDeals && (
        <div className="submenu">
          <NavLink to="/deals/open">Open Deals</NavLink>
          <NavLink to="/deals/won">Won Deals</NavLink>
          <NavLink to="/deals/lost">Lost Deals</NavLink>
        </div>
      )}

      {/* EXPENSES */}
      <div className="menu" onClick={() => setOpenExpenses(!openExpenses)}>
        <IndianRupee size={18} />
        <span>Expenses</span>
        <ChevronDown size={16} />
      </div>
      {openExpenses && (
        <div className="submenu">
          <NavLink to="/expenses/list">Expenses List</NavLink>
          <NavLink to="/expenses/add">Add Expense</NavLink>
          <NavLink to="/expenses/area">Area of Expense</NavLink>
        </div>
      )}

      {/* REPORTS */}
      <div className="menu" onClick={() => setOpenReports(!openReports)}>
        <BarChart3 size={18} />
        <span>Reports</span>
        <ChevronDown size={16} />
      </div>
      {openReports && (
        <div className="submenu">
          <NavLink to="/reports/deals">Deals Report</NavLink>
          <NavLink to="/reports/proposal">Proposal Report</NavLink>
          <NavLink to="/reports/pipeline">Pipeline Report</NavLink>
          <NavLink to="/reports/payment-history">Payment History</NavLink>
        </div>
      )}

      {/* INVOICES */}
      <NavLink to="/invoices" style={link}>
        <FileText size={18} />
        <span>Invoices</span>
      </NavLink>

      {/* PROPOSALS */}
      <div className="menu" onClick={() => setOpenProposals(!openProposals)}>
        <FileSignature size={18} />
        <span>Proposals</span>
        <ChevronDown size={16} />
      </div>
      {openProposals && (
        <div className="submenu">
          <NavLink to="/proposals/list">Proposal List</NavLink>
          <NavLink to="/proposals/add">Add Proposal</NavLink>
        </div>
      )}

      {/* ACTIVITIES */}
      <div className="menu" onClick={() => setOpenActivities(!openActivities)}>
        <Activity size={18} />
        <span>Activities</span>
        <ChevronDown size={16} />
      </div>
      {openActivities && (
        <div className="submenu">
          <NavLink to="/activities/list">Activity List</NavLink>
          <NavLink to="/activities/calendar">Calendar View</NavLink>
        </div>
      )}

      {/* USERS */}
      <NavLink to="/dashboard/users" style={link}>
        <Users size={18} />
        <span>Users & Roles</span>
      </NavLink>

      {/* SETTINGS */}
      <NavLink to="/settings" style={link}>
        <Settings size={18} />
        <span>Settings</span>
      </NavLink>
    </div>
  );
};






/* STYLES */
const sidebar = {
  width: "240px",
  background: "#020617",
  color: "#fff",
  minHeight: "100vh",
  padding: "20px",
};

const logo = {
  marginBottom: "30px",
  fontSize: "20px",
  color: "#38bdf8",
};

const link = ({ isActive }) => ({
  display: "block",
  padding: "12px",
  marginBottom: "6px",
  color: isActive ? "#38bdf8" : "#cbd5f5",
  textDecoration: "none",
});

const menu = {
  padding: "12px",
  cursor: "pointer",
  color: "#cbd5f5",
};

const submenu = {
  marginLeft: "12px",
  borderLeft: "2px solid #1e293b",
};

const sublink = ({ isActive }) => ({
  display: "block",
  padding: "10px",
  color: isActive ? "#22c55e" : "#94a3b8",
  textDecoration: "none",
});

export default Sidebar;
