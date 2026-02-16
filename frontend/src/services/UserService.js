export const usersData = [
  {
    id: 1,
    name: "Riya Kumari",
    email: "riya@crm.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Aman Verma",
    email: "aman@crm.com",
    role: "Sales",
    status: "Active",
  },
];

export const rolesData = [
  {
    id: 1,
    name: "Admin",
    permissions: ["dashboard", "leads", "deals", "users", "reports"],
  },
  {
    id: 2,
    name: "Sales",
    permissions: ["dashboard", "deals"],
  },
];

export const getUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(usersData), 500);
  });

export const getRoles = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(rolesData), 500);
  });