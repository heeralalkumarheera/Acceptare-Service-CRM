🚀 Acceptare Service CRM – Frontend

A modern CRM (Customer Relationship Management) frontend application developed as part of ATPL Internship – 30 Days Frontend Roadmap.
This project focuses on scalable UI architecture, clean routing, reusable components, and professional dashboard experience.

📌 Project Overview

Acceptare Service CRM is a web-based CRM frontend that helps manage:

Leads & Deals

Proposals & Invoices

Activities & Calendar

Expenses & Reports

Users, Roles & Settings

The application is built with React + Vite, following real-world CRM UI patterns inspired by enterprise dashboards.

🧰 Tech Stack

Frontend: React (Vite)

Routing: React Router DOM

State Management: React Hooks, Context API

UI Icons: Lucide React

Styling: CSS / Modular CSS

Version Control: Git & GitHub

Development Tool: VS Code (Windows / Microsoft)

📂 Project Structure
Acceptare-Service-CRM/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Cards.jsx
│   │   │   └── Reusable UI components
│   │   │
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── leads/
│   │   │   ├── deals/
│   │   │   ├── proposals/
│   │   │   ├── activities/
│   │   │   ├── expenses/
│   │   │   ├── reports/
│   │   │   ├── invoices/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   │
│   │   ├── services/
│   │   │   ├── activityService.js
│   │   │   ├── proposalService.js
│   │   │   ├── expenseService.js
│   │   │   └── reportService.js
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md

✨ Key Features
📊 Dashboard

Summary cards (Leads, Deals, Revenue, Won Deals)

Monthly Revenue Chart

Deals by Stage (Pie Chart)

Clean professional layout

👥 Leads Management

Persons

Organizations

Lead Groups

Structured navigation with sub-menus

🤝 Deals

Open Deals

Won Deals

Lost Deals

Stage-based views

📄 Proposals

Proposal List

Add New Proposal

Status handling (Draft, Sent, Accepted, Rejected)

📅 Activities

Activity List (Meeting, Call, Email)

Calendar View

Schedule & Reminder support

Right-side content rendering via layout

💸 Expenses

Expense List

Add Expense

Area of Expense

Professional table-based UI

📑 Reports

Deals Report

Proposal Report

Pipeline Report

Payment History

🧾 Invoices

Invoice listing

Clean navigation integration

👤 Users & Roles

User management UI

Role-based structure (UI level)

⚙️ Settings

General Settings

Company Info

Email Setup

Notification

Tax & Payment Methods

Tags & Custom Fields (UI)

🧭 Layout Architecture

Sidebar: Persistent navigation

MainLayout: Sidebar + Header + Dynamic Page Content

Right-side rendering: All pages load beside sidebar (no full reload)

🗓️ 30 Days Work Summary (ATPL Internship)
Week 1 (Days 1–7)

Project setup using Vite

Folder structure planning

Dashboard UI

Sidebar layout

Routing setup

Week 2 (Days 8–14)

Leads & Deals modules

Nested routing

Reusable UI components

Navigation fixes

Week 3 (Days 15–21)

Proposals module

Activities list & calendar

Expenses module

Service layer integration (mock)

Week 4 (Days 22–30)

Reports module

Settings module

Header (Profile, Notification, Theme)

UI polishing

Git commits & documentation

🖥️ Local Development Setup (Windows / Microsoft)
Prerequisites

Node.js (v18+)

Git

VS Code

Run Project Locally
git clone <repository-url>
cd Acceptare-Service-CRM/frontend
npm install
npm run dev

Local URL
http://localhost:5173


Developed & tested on Windows (Microsoft) environment.

🔗 Git Workflow

Feature-based commits

Day-wise documentation

Clean commit messages

Rebase for clean history

Example:

feat(activity): activities list and calendar view
docs(frontend): update day-wise work summary

👩‍💻 Developer

Riya Kumari
Frontend Developer Intern – ATPL
React | CRM UI | Dashboard Systems

📌 Note

This project focuses on frontend architecture and UI implementation.