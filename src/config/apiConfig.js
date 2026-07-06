const isElectron = window.location.protocol === "file:";

export const API_BASE_URL = isElectron
  ? "https://api.kutumbi.com/api"
  : "/api";