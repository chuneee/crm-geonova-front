import api from "../axios.config";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/auth.type";
import { User } from "../types/user.types";

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

  updatePassword: async (data: any): Promise<void> => {
    const { data: response } = await api.patch("/auth/update-password", data);
    return response;
  },

  updateInfoProfile: async (data: any): Promise<User> => {
    const { data: response } = await api.patch(
      "/auth/update-info-profile",
      data
    );
    return response;
  },
};
