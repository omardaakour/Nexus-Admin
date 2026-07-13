import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "../services/userService";

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      // Invalidate every cached "users" page (any params) so counts and
      // rows reflect the deletion immediately, wherever the user is paged to.
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
