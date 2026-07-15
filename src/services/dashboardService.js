import api from "./api";

export const getDashboardData = () => {
  return api.get("/Dashboard");
};
