export const loginUser = (data) => {
  if (data.email && data.password) {
    localStorage.setItem("isAuthenticated", "true");
    console.log("Login successful");
  }
  console.log("Login data:", data);
};
