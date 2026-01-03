import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page is Working</h1>} />
      <Route path="/login" element={<h1>Login Page</h1>} />
    </Routes>
  );
}

export default App;