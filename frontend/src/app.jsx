import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Deals from "./pages/Deals";
import Persons from "./pages/persons/Persons";
import PersonDetail from "./pages/persons/PersonDetail";
import Organizations from "./pages/Organizations";
import LeadGroups from "./pages/groups/LeadGroups";

import DealsPipeline from "./pages/deals/DealsPipeline";
import OpenDeals from "./pages/deals/OpenDeals";
import WonDeals from "./pages/deals/WonDeals";
import LostDeals from "./pages/deals/LostDeals";
import DealsAnalytics from "./pages/deals/DealsAnalytics";
import DealDetails from "./pages/deals/DealDetails";

import ExpensesList from "./pages/expenses/ExpensesList";
import AddExpense from "./pages/expenses/AddExpense";
import ExpenseArea from "./pages/expenses/ExpenseArea";


import PipelineReport from "./pages/reports/PipelineReport";
import DealsReport from "./pages/reports/DealsReport";
import ProposalReport from "./pages/reports/ProposalReport";
import PaymentHistory from "./pages/reports/PaymentHistory";

import Invoices from "./pages/invoices/invoices";

import ProposalList from "./pages/proposals/ProposalList";
import AddProposal from "./pages/proposals/AddProposal";

import ActivityList from "./pages/activities/ActivityList";
import CalendarView from "./pages/activities/CalendarView";
import UsersRolesLayout from "./layouts/UsersRolesLayout";
import UsersLayout from "./layouts/UsersLayout";
import UsersRoles from "./pages/users/UsersRoles"
import UsersList from "./pages/users/UsersList";
import RolesList from "./pages/users/RolesList";
import CreateUser from "./pages/users/CreateUser";
import CreateRole from "./pages/users/CreateRole";

import SettingsLayout from "./pages/settings/SettingsLayout";
import GeneralSettings from "./pages/settings/GeneralSettings";
import CronJob from "./pages/settings/CronJob";
import CustomFields from "./pages/settings/CustomFields";
import EmailSetup from "./pages/settings/EmailSetup";
import BroadcastSetup from "./pages/settings/BroadcastSetup";
import NotificationSettings from "./pages/settings/NotificationSettings";
import InvoiceSettings from "./pages/settings/InvoiceSettings";
import TaxSettings from "./pages/settings/TaxSettings";
import PaymentMethods from "./pages/settings/PaymentMethods";
import TagsSettings from "./pages/settings/TagsSettings";

function App() {
  return (
    
              <Routes>

          {/* LOGIN */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* MAIN DASHBOARD LAYOUT */}
          <Route path="/" element={<DashboardLayout />}>
            
            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />

            {/* LEADS */}
            <Route path="leads" element={<Leads />} />
            <Route path="leads/persons" element={<Persons />} />
            <Route path="leads/persons/:id" element={<PersonDetail />} />
            <Route path="leads/organizations" element={<Organizations />} />
            <Route path="leads/groups" element={<LeadGroups />} />

            {/* DEALS */}
            <Route path="deals" element={<Deals />} />
            <Route path="deals/pipeline" element={<DealsPipeline />} />
            <Route path="deals/open" element={<OpenDeals />} />
            <Route path="deals/won" element={<WonDeals />} />
            <Route path="deals/lost" element={<LostDeals />} />
            <Route path="deals/analytics" element={<DealsAnalytics />} />
            <Route path="deals/:id" element={<DealDetails />} />

            <Route path="/expenses/list" element={<ExpensesList />} />
  <Route path="/expenses/add" element={<AddExpense />} />
  <Route path="/expenses/area" element={<ExpenseArea />} />

            {/* REPORTS */}
            <Route path="reports/pipeline" element={<PipelineReport />} />
            <Route path="reports/deals" element={<DealsReport />} />
            <Route path="reports/proposal" element={<ProposalReport />} />
            <Route path="reports/payment-history" element={<PaymentHistory />} />

            <Route path="invoices" element={<Invoices />} />

            {/* PROPOSALS */}
        <Route path="/proposals" element={<ProposalList />} />
        <Route path="/proposals/add" element={<AddProposal />} />

          </Route>

          <Route path="/activities">
  <Route path="list" element={<ActivityList />} />
  <Route path="calendar" element={<CalendarView />} />
</Route>

{/* USERS & ROLES */}
          <Route path="/dashboard/users" element={<UsersLayout />}>
          <Route path="/dashboard/users/roles" element={<UsersRoles />} />
          <Route path="users" element={<UsersRolesLayout />}></Route>
  <Route index element={<UsersList />} />
  <Route path="roles" element={<RolesList />} />
  <Route path="create" element={<CreateUser />} />
  <Route path="roles/create" element={<CreateRole />} />
</Route>

<Route path="/settings" element={<SettingsLayout />}>
  <Route index element={<GeneralSettings />} />
  <Route path="general" element={<GeneralSettings />} />
  <Route path="cron" element={<CronJob />} />
  <Route path="custom-fields" element={<CustomFields />} />
  <Route path="email" element={<EmailSetup />} />
  <Route path="broadcast" element={<BroadcastSetup />} />
  <Route path="notification" element={<NotificationSettings />} />
  <Route path="invoice" element={<InvoiceSettings />} />
  <Route path="tax" element={<TaxSettings />} />
  <Route path="payment-methods" element={<PaymentMethods />} />
  <Route path="tags" element={<TagsSettings />} />
</Route>

        </Routes>
      
    
  );
}

export default App;
