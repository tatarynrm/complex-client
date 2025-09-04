/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { IUser, setUserRedux } from "@/store/slices/authSlice";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
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
        const { data } = await api.get("/auth/me");
        dispatch(setUserRedux(data));

        if (data.is_blocked) {
          return router.replace("/blocked");
        }
        setIsAuth(true);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setIsAuth(false);
          router.replace("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuth) {
    return null; // вже буде редірект, тому нічого не рендеримо
  }
  return null;
};

export default InitUser;
