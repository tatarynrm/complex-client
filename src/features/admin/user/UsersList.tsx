/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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

  // modal state
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRowClick = (user: IUser) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      await api.put(`/users/${selectedUser.id}`, selectedUser);
      setOpen(false);
      fetchUsers(); // reload list
    } catch (err) {
      console.error("Помилка при оновленні користувача", err);
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Список користувачів</h2>

      <div className="md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-black">
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
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className="cursor-pointer hover:bg-muted"
                >
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

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редагування користувача</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-3">
              <Input
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                placeholder="Email"
              />
              <Input
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                placeholder="Імʼя"
              />
              <Input
                value={selectedUser.surname}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, surname: e.target.value })
                }
                placeholder="Прізвище"
              />
              <Input
                value={selectedUser.last_name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    last_name: e.target.value,
                  })
                }
                placeholder="По-батькові"
              />
              <Input
                value={selectedUser.phone_number ?? ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    phone_number: e.target.value,
                  })
                }
                placeholder="Телефон"
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={!!selectedUser.is_admin}
                  onCheckedChange={(val) =>
                    setSelectedUser({ ...selectedUser, is_admin: !!val })
                  }
                />
                <span>Адміністратор</span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={!!selectedUser.is_guard}
                  onCheckedChange={(val) =>
                    setSelectedUser({ ...selectedUser, is_guard: !!val })
                  }
                />
                <span>Охоронець</span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={!!selectedUser.is_blocked}
                  onCheckedChange={(val) =>
                    setSelectedUser({ ...selectedUser, is_blocked: !!val })
                  }
                />
                <span>Заблокований</span>
              </div>

              <Button onClick={handleSave} className="w-full">
                Зберегти
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;
