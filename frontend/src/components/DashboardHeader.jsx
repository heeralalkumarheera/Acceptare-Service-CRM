import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";
import "./dashboardHeader.css";
import ThemeToggle from "./ThemeToggle";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      
      {/* LEFT */}
      <div>
        <h2>Dashboard</h2>
        <p className="breadcrumb">Home / Dashboard</p>
      </div>

      {/* RIGHT */}
      <div className="header-actions">
        
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>

        <Bell size={20} className="icon" />

        <div className="profile">
          <UserCircle size={26} />
          <span>Admin</span>
        </div>
        <ThemeToggle />

      </div>
    </div>
  );
};

export default DashboardHeader;
