export const API_URL = "https://nexus-admin-api-fplt.onrender.com";
//"http://localhost:5000";
import axios from "axios";

const api = axios.create({
  baseURL: "https://6a578367914a025dcff31e62.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    return;
  }

  return response;
}
