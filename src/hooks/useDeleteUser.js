import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "../services/userService";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUsers([id]),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
