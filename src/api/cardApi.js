import { usersAndCardsApi } from "./axiosInstance";

export const getCards = (page = 0, size = 10) =>
  usersAndCardsApi.get(`/cards?page=${page}&size=${size}`);

export const createCard = (dto) => usersAndCardsApi.post("/cards", dto);
export const updateCard = (dto) => usersAndCardsApi.put("/cards", dto);
export const deleteCard = (id) => usersAndCardsApi.delete(`/cards/${id}`);
