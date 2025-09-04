import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionService } from "@/services/session.service";

export const useSessions = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: sessionService.getAllSessions,
    staleTime: 1 * 60 * 1000, // 1 хвилина кешу (на вибір)
  });
};

export const useDeleteOtherSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionService.deleteOtherSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
