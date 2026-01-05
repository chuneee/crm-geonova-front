// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  redirectTo?: string;
}

export const PublicRoute = ({
  redirectTo = "/dashboard",
}: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Si ya está autenticado, redirigir al dashboard
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
