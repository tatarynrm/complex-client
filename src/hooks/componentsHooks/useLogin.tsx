import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { ILoginDto } from "@/types/auth.types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ILoginDto) => authService.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
};
