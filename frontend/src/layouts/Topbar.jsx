import React from "react";
import "./topbar.css";
import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="search">
        <Search size={18} />
        <input placeholder="Search CRM..." />
      </div>

      <div className="top-actions">
        <Bell size={18} />
        <User size={18} />
      </div>
    </div>
  );
}