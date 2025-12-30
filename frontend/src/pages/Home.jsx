import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page is Working</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

export default Home;