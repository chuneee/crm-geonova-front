import { useState } from "react";

export interface ErrorState {
  message: string;
  type: "error" | "warning" | "info";
}

export const useError = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (
    message: string,
    type: "error" | "warning" | "info" = "error"
  ) => {
    setError({ message, type });
  };

  const clearError = () => {
    setError(null);
  };

  const handleApiError = (err: any) => {
    if (err.response) {
      // Error de respuesta del servidor
      const status = err.response.status;
      const message = err.response.data?.message;

      switch (status) {
        case 400:
          showError(message || "Datos inválidos");
          break;
        case 401:
          showError("Email o contraseña incorrectos");
          break;
        case 403:
          showError("No tienes permisos para realizar esta acción");
          break;
        case 404:
          showError("Recurso no encontrado");
          break;
        case 409:
          showError(message || "El recurso ya existe");
          break;
        case 422:
          showError("Error de validación");
          break;
        case 429:
          showError("Demasiados intentos. Intenta más tarde");
          break;
        case 500:
          showError("Error del servidor. Intenta más tarde");
          break;
        default:
          showError(message || "Error desconocido");
      }
    } else if (err.code === "ERR_NETWORK") {
      showError("No se pudo conectar con el servidor");
    } else if (err.request) {
      showError("No se recibió respuesta del servidor");
    } else {
      showError(err.message || "Error inesperado");
    }
  };

  return {
    error,
    showError,
    clearError,
    handleApiError,
  };
};
