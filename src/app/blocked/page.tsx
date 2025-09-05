/* eslint-disable react/no-unescaped-entities */
"use client";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import React from "react";

const Blocked = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { data } = await api.get("/auth/logout");
      if (data.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-900 via-red-900 to-red-900 text-white px-4">
      <h1 className="text-3xl text-center md:text-6xl font-extrabold mb-6 drop-shadow-lg">
        🚫 Ваш аккаунт заблоковано!
      </h1>
      <p className="text-lg max-w-md text-center mb-8 drop-shadow-md">
        Ваш доступ до системи обмежено. Якщо ви вважаєте це помилкою, будь
        ласка, зв'яжіться з адміністрацією.
      </p>
      <button
        onClick={() => {
          handleLogout();
        }}
        className="bg-white text-red-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-100 transition"
      >
        Повернутися до входу
      </button>
    </div>
  );
};

export default Blocked;
