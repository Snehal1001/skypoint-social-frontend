import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore((s) => s.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
