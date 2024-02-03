import { api } from "@/services/api";

const BASE_URL = "/clocks";

export const getClocksById = async (id, range = null) => {
  if (range) {
    return api.get(`${BASE_URL}/${id}`, {
      params: { ...range },
    });
  }

  return api.get(`${BASE_URL}/${id}`);
};

export const getAllClocks = async () => api.post(`${BASE_URL}`);

export const clockIn = async ({ hash, userId, startAt }) =>
  api.post(`${BASE_URL}`, { hash, userId, startAt });

export const clockOut = async ({ hash, userId, endAt }) =>
  api.put(`${BASE_URL}`, { userId, hash, endAt });

export const deleteClock = async (hash) => api.delete(`${BASE_URL}/${hash}`);
