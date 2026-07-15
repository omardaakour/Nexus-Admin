import axios from "axios";

const api = axios.create({
  baseURL: "https://6a578367914a025dcff31e62.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
