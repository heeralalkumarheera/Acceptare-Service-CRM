export const fetchPersons = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Amit Kumar",
          email: "amit@gmail.com",
          phone: "9876543210",
          organization: "Alpha Corp",
          status: "Active",
        },
        {
          id: 2,
          name: "Riya Kumari",
          email: "riya@gmail.com",
          phone: "9123456780",
          organization: "Beta Systems",
          status: "Inactive",
        },
      ]);
    }, 1500);
  });
};