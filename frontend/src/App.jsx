// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import { Navigate } from "react-router-dom";
export default function App() {
  const { user } = useAuth();  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={user ? <Dashboard /> : <Navigate to="/login" />}
/>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Login />} />
      </Routes>
      </div>
  );
}
