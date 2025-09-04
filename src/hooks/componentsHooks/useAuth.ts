import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { IUser } from "@/types/auth.types";


export const useAuth = () => {
  return useQuery<IUser>({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    retry: false, // не намагається повторно, якщо 401
  });
};
