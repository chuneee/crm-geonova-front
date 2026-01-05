import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);

    const dateToexp = new Date(decodedToken.exp * 1000);
    console.log("Token expiration date:", dateToexp.toLocaleString());
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  // exp está en segundos, Date.now() en milisegundos
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const getTokenExpirationTime = (token: string): number | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return decoded.exp * 1000; // Convertir a milisegundos
};

export const getTimeUntilExpiration = (token: string): number => {
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return 0;

  return Math.max(0, expirationTime - Date.now());
};
