import { orderApi } from "./axiosInstance";

export const getOrders = (filter = {}, page = 0, size = 10) => {
  const params = new URLSearchParams({
    page,
    size,
    ...filter,
  });

  return orderApi.get(`/orders?${params.toString()}`);
};

export const getOrderById = (id) => orderApi.get(`/orders/${id}`);

export const createOrder = (dto) => orderApi.post("/orders", dto);

export const updateOrder = (id, dto) => orderApi.put(`/orders/${id}`, dto);

export const deleteOrder = (id) => orderApi.delete(`/orders/${id}`);
