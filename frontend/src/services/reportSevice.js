import axios from "axios";

/// src/services/reportService.js

export const getDealsReport = async () => {
  return Promise.resolve([
    { id: 1, name: "Website Project", status: "Won", amount: 50000 },
    { id: 2, name: "CRM Setup", status: "Open", amount: 30000 },
    { id: 3, name: "Mobile App", status: "Lost", amount: 20000 },
  ]);
};

export const getProposalReport = async () => {
  return {
    totalProposals: 12,
    approved: 6,
    rejected: 3,
    pending: 3,
  };
};

export const getPipelineReport = async () => {
  return [
    { stage: "Lead", value: 10 },
    { stage: "Negotiation", value: 5 },
    { stage: "Closed", value: 5 },
  ];
};

export const getPaymentHistory = async () => {
  return [
    { id: 1, client: "ABC Pvt Ltd", amount: 50000, status: "Paid" },
    { id: 2, client: "XYZ Ltd", amount: 30000, status: "Pending" },
  ];
};
