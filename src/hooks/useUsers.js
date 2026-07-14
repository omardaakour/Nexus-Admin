import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

export function useUsers(params) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const data = await getUsers(params);

      return data;
    },
  });
}
