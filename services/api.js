import axios from "axios";

import { API_DISCORD_URL } from "@/config/app";

const api = axios.create({
  baseURL: API_DISCORD_URL,
});

export default api;
