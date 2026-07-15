import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardService";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: async () => {
      const response = await getDashboardData();

      return response.data[0];
    },
  });
}
