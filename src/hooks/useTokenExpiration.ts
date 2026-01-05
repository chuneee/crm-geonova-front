import { useAuth } from "./useAuth";
import { getTimeUntilExpiration, isTokenExpired } from "../utils/token.utils";
import { AuthAPI } from "../api/endpoints/auth.api";
import { useCallback, useEffect, useRef } from "react";

export const useTokenExpiration = () => {
  const { logout } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const warningTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const data = await AuthAPI.refreshToken(refreshToken);

      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Reiniciar el monitoreo con el nuevo token
      startMonitoring();
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  }, [logout]);

  const startMonitoring = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    console.log("Starting token expiration monitoring...");

    // Limpiar timeouts anteriores
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);

    if (isTokenExpired(token)) {
      // Token ya expirado, hacer logout
      logout();
      return;
    }

    const timeUntilExpiration = getTimeUntilExpiration(token);

    // Refrescar el token 1 minuto antes de que expire
    // const refreshTime = Math.max(0, timeUntilExpiration - 60000);
    // timeoutRef.current = setTimeout(() => {
    //   refreshToken();
    // }, refreshTime);

    // Opcional: mostrar advertencia 5 minutos antes
    const warningTime = Math.max(0, timeUntilExpiration - 300000);
    if (warningTime > 0) {
      warningTimeoutRef.current = setTimeout(() => {
        console.warn("Tu sesión expirará pronto");
        // Aquí podrías mostrar un toast o notificación
      }, warningTime);
    }
  }, [logout, refreshToken]);

  useEffect(() => {
    startMonitoring();

    // Limpiar al desmontar
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [startMonitoring]);

  return { refreshToken };
};
