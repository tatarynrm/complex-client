import api from "@/lib/axios";
import { ISession } from "@/types/session.types";

export const sessionService = {
  getAllSessions: async () => {
    const { data } = await api.get<ISession[]>("/auth/all-sessions");
    return data;
  },
  deleteOtherSessions: async () => {
    await api.delete("/auth/delete-other-sessions");
  },
};
