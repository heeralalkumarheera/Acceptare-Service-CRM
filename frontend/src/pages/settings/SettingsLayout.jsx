import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./settings.css";

const SettingsLayout = () => {
  return (
    <div className="settings-wrapper">
      {/* LEFT PANEL */}
      <aside className="settings-sidebar">
        <NavLink to="general">General</NavLink>
        <NavLink to="cron">Cron Job</NavLink>
        <NavLink to="custom-fields">Custom Fields</NavLink>
        <NavLink to="email">Email Setup</NavLink>
        <NavLink to="broadcast">Broadcast Setup</NavLink>
        <NavLink to="notification">Notification</NavLink>
        <NavLink to="invoice">Invoice</NavLink>
        <NavLink to="tax">Tax</NavLink>
        <NavLink to="payment-methods">Payment Methods</NavLink>
        <NavLink to="tags">Tags</NavLink>
      </aside>

      {/* RIGHT CONTENT */}
      <section className="settings-content">
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsLayout;
