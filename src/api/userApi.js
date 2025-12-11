import { usersAndCardsApi } from "./axiosInstance";

export const getUsers = (page = 0, size = 10, email = "") =>
  usersAndCardsApi.get(`/users?page=${page}&size=${size}&email=${email}`);

export const createUser = (dto) => usersAndCardsApi.post("/users", dto);
export const updateUser = (dto) => usersAndCardsApi.put("/users", dto);
export const deleteUser = (id) => usersAndCardsApi.delete(`/users/${id}`);
