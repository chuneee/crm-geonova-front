import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../api/types/user.types";
import { LoginCredentials } from "../api/types/auth.type";
import { AuthAPI } from "../api/endpoints/auth.api";
import { isTokenExpired } from "../utils/token.utils";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export interface UpdateProfileData {
  names?: string;
  surnames?: string;
  email?: string;
  phone?: string | null;
  role?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        // Verificar si el token no está expirado
        if (isTokenExpired(token)) {
          // Token expirado, limpiar
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          setUser(null);
        } else {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error("Error parsing saved user:", error);
            localStorage.removeItem("user");
          }
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // authAPI.login lanzará el error con el mensaje del backend
    const response = await AuthAPI.login(credentials);

    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = () => {
    // AuthAPI.logout().catch(console.error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    console.log("User logged out");
    setUser(null);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    const updatedUser = await AuthAPI.updateInfoProfile(data);

    // Actualizar el estado local
    setUser(updatedUser);

    // Actualizar localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
        hasPermission: (permission: string) => true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
