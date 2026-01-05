import api from "../axios.config";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/auth.type";

export const AuthAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await api.post("/auth/refresh", { refreshToken });
    return data;
  },
};
