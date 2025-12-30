import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return 
    <form onSubmit={handleLogin}>
      <button type="submit">Login</button>
    </form>
  import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../services/authServices";
 origin/main

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    // Fake auth (for frontend testing)
    if (email === "admin@crm.com" && password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard/lead-groups"); // 👈 VERY IMPORTANT
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "1rem" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

 export default Login;
