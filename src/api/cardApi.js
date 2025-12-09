import api from "./axiosInstance";

export const getCards = (page = 0, size = 10) =>
  api.get(`/cards?page=${page}&size=${size}`);

export const createCard = (dto) => api.post("/cards", dto);
export const updateCard = (dto) => api.put("/cards", dto);
export const deleteCard = (id) => api.delete(`/cards/${id}`);
