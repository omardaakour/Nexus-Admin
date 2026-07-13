import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../services/userService";

// Role/department lists don't change during a session, so this is fetched
// once and kept fresh indefinitely rather than refetched on every filter
// panel open.
export function useFilterOptions() {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: getFilterOptions,
    staleTime: Infinity,
  });
}
