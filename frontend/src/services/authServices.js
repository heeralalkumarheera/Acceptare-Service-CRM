export const loginUser = (email, password) => {
  if (email === "admin@crm.com" && password === "123456") {
    localStorage.setItem("isAuth", "true");
    return true;
  }
};
