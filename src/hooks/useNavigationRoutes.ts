import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { privateRoutes } from "../routes/routes.config";

export const useNavigationRoutes = () => {
  const { hasPermission } = useAuth();

  const visibleRoutes = useMemo(() => {
    return privateRoutes.filter((route) => {
      // Solo rutas que deben mostrarse en el menú
      if (!route.showInMenu) return false;

      // Si tiene permiso definido, verificar
      if (route.permission) {
        return hasPermission(route.permission);
      }

      return true;
    });
  }, [hasPermission]);

  return visibleRoutes;
};
