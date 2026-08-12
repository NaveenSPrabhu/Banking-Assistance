import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) return <Navigate to="/" replace />;

  const currentRole = String(user.role || "Customer").toLowerCase();
  const requiredRole = String(role || "Customer").toLowerCase();

  if (currentRole !== requiredRole) {
    return <Navigate to={currentRole === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <Outlet />;
}
