// src/routes/AppRoutes.tsx (versión alternativa más limpia)
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { PermissionRoute } from "./PermissionRoute";
import { TokenExpirationMonitor } from "../components/auth/TokenExpirationMonitor";
import { Layout } from "../components/Layout";
import { Login } from "../pages/Login";
import { privateRoutes, RouteConfig } from "./routes.config";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const renderRoute = (route: RouteConfig) => {
  const Component = route.element;
  const element = (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );

  if (route.permission) {
    return (
      <Route
        key={route.path}
        element={<PermissionRoute permission={route.permission} />}
      >
        <Route path={route.path} element={element} />
      </Route>
    );
  }

  return <Route key={route.path} path={route.path} element={element} />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TokenExpirationMonitor />
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {privateRoutes.map(renderRoute)}
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
