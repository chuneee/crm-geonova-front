import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTokenExpiration } from "../../hooks/useTokenExpiration";

export const TokenExpirationMonitor = () => {
  const { isAuthenticated } = useAuth();

  // Este hook se encarga de monitorear y refrescar el token automáticamente
  useTokenExpiration();

  return null; // Este componente no renderiza nada
};
