import { authApi } from "./axiosInstance";

export const login = (data) => authApi.post("/auth/login", data);
export const register = (data) => authApi.post("/auth/register", data);
export const validateToken = (token) =>
  authApi.post("/auth/validate", { token });
export const refreshToken = (token) => authApi.post("/auth/refresh", { token });
