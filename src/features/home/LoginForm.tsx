/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { useDispatch } from "react-redux";
import { setUserRedux } from "@/store/slices/authSlice";
import { useLogin } from "@/hooks/componentsHooks/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  // 🔹 перевірка авторизації при завантаженні
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/auth/me", {
          withCredentials: true, // без цього кук не відправляються
          headers: { "Cache-Control": "no-store" }, // щоб уникнути 304
        });

        // if (data.is_blocked) {
        //   router.replace("/blocked");
        //   return;
        // }
console.log(data,'DATA');

        if (data.email) {
          dispatch(setUserRedux(data));
          router.replace("/dashboard");
          return;
        }

        setIsAuth(false); // ще не авторизований
      } catch (err: any) {
        if (err.response?.status === 401) {
          setIsAuth(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await mutateAsync({ email, password });

    if (!result.success && result.message) {
      return alert(result.message);
    }

    if (result.success && result.user) {
      dispatch(setUserRedux(result.user));
      router.push("/dashboard");
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Авторизація
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : null}
            Увійти
          </Button>
        </form>
      </div>
    </div>
  );
}
