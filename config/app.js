export const API_DISCORD_URL = "https://discord.com/api";

export const API =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://dpskt-api.onrender.com/api";
