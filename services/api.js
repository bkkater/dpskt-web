import axios from "axios";

import { API_DISCORD_URL, API } from "@/config/app";

export const api = axios.create({
  baseURL: API,
});

export const discordApi = axios.create({
  baseURL: API_DISCORD_URL,
});
