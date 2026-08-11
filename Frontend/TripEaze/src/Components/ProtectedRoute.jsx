import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/utkarshadmin" replace />;
  }

  return <Outlet />;
}