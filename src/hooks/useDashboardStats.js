import { useQuery } from "@tanstack/react-query";

import {
  dashboardStats,
  userGrowthData,
  departmentData,
  recentActivity,
} from "../data/dashboardMock";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: async () => {
      return {
        stats: dashboardStats,
        growth: userGrowthData,
        departments: departmentData,
        recentActivity: recentActivity,
      };
    },
  });
}
