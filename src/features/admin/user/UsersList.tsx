/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios"; // axios instance

export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  last_name: string;
  phone_number: string | null;
  password_hash: string;
  is_admin: boolean | null;
  is_guard: boolean | null;
  is_blocked: boolean | null;
}

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get<IUser[]>("/users/all");
        setUsers(res.data);
      } catch (err: any) {
        setError("Помилка при завантаженні користувачів");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Список користувачів</h2>

      {/* --- Desktop Table --- */}
      <div className="md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Імʼя</th>
              <th className="px-4 py-2 border">Прізвище</th>
              <th className="px-4 py-2 border">По-батькові</th>
              <th className="px-4 py-2 border">Телефон</th>
              <th className="px-4 py-2 border">Адміністратор</th>
              <th className="px-4 py-2 border">Охоронець</th>
              <th className="px-4 py-2 border">Заблокований</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-4 text-gray-500">
                  Користувачів немає
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.surname}</td>
                  <td className="border px-4 py-2">{user.last_name}</td>
                  <td className="border px-4 py-2">
                    {user.phone_number ?? "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.is_admin ? "✅" : "❌"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.is_guard ? "✅" : "❌"}
                  </td>
                  <td className="border px-4 py-2">
                    {user.is_blocked ? "✅" : "❌"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Cards ---
      <div className="grid gap-4 md:hidden">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">Користувачів немає</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500">ID: {user.id}</p>
              <p className="font-semibold">{user.email}</p>
              <p>
                {user.surname} {user.name} {user.last_name}
              </p>
              <p>📞 {user.phone_number ?? "-"}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>Admin: {user.is_admin ? "✅" : "❌"}</span>
                <span>Guard: {user.is_guard ? "✅" : "❌"}</span>
                <span>Blocked: {user.is_blocked ? "🚫" : "✅"}</span>
              </div>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default UsersList;
