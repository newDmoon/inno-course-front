import api from "./axiosInstance";

export const login = (data) => api.post("/auth/login", data);  
export const register = (data) => api.post("/auth/register", data);
export const validateToken = (token) => api.post("/auth/validate", { token });
export const refreshToken = (token) => api.post("/auth/refresh", { token });
