import api from "@/lib/axios";
import { ILoginDto, IUser } from "@/types/auth.types";


export const authService = {
  login: async (payload: ILoginDto) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },
  logout: async () => {
    await api.post("/auth/logout");
  },
  me: async (): Promise<IUser> => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};
