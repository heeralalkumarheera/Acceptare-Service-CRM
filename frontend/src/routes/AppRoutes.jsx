import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages



import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import LeadGroups from "../pages/LeadGroups";
import ProtectedRoute from "./ProtectedRoute";
import InvoiceList from "../pages/InvoiceList";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />


      {/* Protected Routes with MainLayout */}
      <Route></Route>

      <Route path="/dashboard" element={ <ProtectedRoute><MainLayout /> </ProtectedRoute> } >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/lead-groups" element={<LeadGroups />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

