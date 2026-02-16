import React from "react";
import { Outlet } from "react-router-dom";

const ReportsLayout = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Reports</h2>
      <Outlet />
    </div>
  );
};

export default ReportsLayout;