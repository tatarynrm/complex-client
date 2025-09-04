/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserRedux, IUser } from "@/store/slices/authSlice";
import api from "@/lib/axios";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const InitUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, status } = await api.get<IUser>("/auth/me", {
          headers: {
            "Cache-Control": "no-store", // вимикаємо кеш
          },
          withCredentials: true, // обов'язково для cookie
        });

        // Якщо 304, можна використати попередній стан
        if (status === 304) {
          setIsAuth(true);
          return;
        }

        dispatch(setUserRedux(data));

        if (data?.is_blocked) {
          router.replace("/blocked");
          return;
        }

        setIsAuth(true);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setIsAuth(false);
          router.replace("/"); // редірект на логін
        } else {
          console.error("Auth check error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuth) {
    return null; // нічого не рендеримо, редірект відбувається
  }

  return null;
};

export default InitUser;
