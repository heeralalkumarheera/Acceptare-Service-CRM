import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return <AppRoutes />;
}

export default App;
