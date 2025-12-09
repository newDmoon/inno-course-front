import api from "./axiosInstance";

export const getUsers = (page = 0, size = 10) =>
  api.get(`/users?page=${page}&size=${size}`);

export const createUser = (dto) => api.post("/users", dto);
export const updateUser = (dto) => api.put("/users", dto);
export const deleteUser = (id) => api.delete(`/users/${id}`);
