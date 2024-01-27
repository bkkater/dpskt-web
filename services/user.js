import { api } from "@/services/api";

const BASE_URL = "/users";

export const getUser = async (discordID) => api.get(`${BASE_URL}/${discordID}`);

export const getAllUsers = async () => api.get(`${BASE_URL}`);

export const storeUser = async ({ player, discordId }) =>
  api.post(`${BASE_URL}`, {
    player,
    discordId,
  });

export const updateUser = async ({
  discordId,
  player: { name, role, corporation, id, isAdmin, statusClock, joinedAt },
}) =>
  api.put(`${BASE_URL}`, {
    discordId,
    player: {
      name,
      role,
      corporation,
      id,
      isAdmin,
      statusClock,
      joinedAt,
    },
  });

export const deleteUser = async (playerID) =>
  api.delete(`${BASE_URL}/${playerID}`);
