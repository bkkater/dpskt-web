import { api } from "@/services/api";

const BASE_URL = "/clocks";

export const getAllClocksByID = async ({ id }) => api.get(`${BASE_URL}/${id}`);

export const getAllClocks = async () => api.post(`${BASE_URL}`);

export const clockIn = async (userId) =>
  api.post(`${BASE_URL}`, {
    _id: userId,
  });

export const clockOut = async (id) => api.put(`${BASE_URL}/${id}`);

export const deleteClock = async (id) => api.delete(`${BASE_URL}/${id}`);
