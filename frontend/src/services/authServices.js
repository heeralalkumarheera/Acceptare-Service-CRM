<<<<<<< HEAD
export const loginUser = (email, password) => {
  if (email === "admin@crm.com" && password === "123456") {
    localStorage.setItem("isAuth", "true");
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("isAuth");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
=======
export const loginUser = (data) => {
  if (data.email && data.password) {
    localStorage.setItem("isAuthenticated", "true");
    console.log("Login successful");
  }
  console.log("Login data:", data);
>>>>>>> origin/main
};
