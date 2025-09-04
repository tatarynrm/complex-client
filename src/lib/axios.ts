/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000", // базова URL-адреса для запитів
  baseURL: "https://api8.ict.lviv.ua", // базова URL-адреса для запитів
  withCredentials: true,
});
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (
//       err.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url?.includes("/auth/refresh-token")
//     ) {
//       originalRequest._retry = true;
//       try {
//         await api.post("/auth/refresh-token");
//         return api(originalRequest);
//       } catch (refreshError: any) {
//         // refresh теж 401 → кидаємо далі
//         return Promise.reject(refreshError);
//       }
//     }

//     if (err.response.status === 403) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default api;
