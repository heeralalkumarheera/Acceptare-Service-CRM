export const loginUser = async ({ email, password }) => {
  // MOCK LOGIN
  if (email === "riya@gmail.com" && password === "123456") {
    return {
      user: {
        id: 1,
        name: "Riya Kumari",
        email: email,
      },
      token: "fake-jwt-token",
    };
  } else {
    throw new Error("Invalid credentials");
  }
};
