import { orderApi } from "./axiosInstance";

export const getItems = () => orderApi.get(`/items`);
