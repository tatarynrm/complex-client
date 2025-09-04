"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import {
  useDeleteOtherSessions,
  useSessions,
} from "@/hooks/componentsHooks/useSessions";
import { cn } from "@/lib/utils";

const SettingsSessions = () => {
  const { data: sessions, isLoading, error, refetch } = useSessions();

  const {
    mutate: deleteOtherSessions,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteOtherSessions();

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 py-10">
        <p>Не вдалося завантажити сесії</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold mb-6">Налаштування сесій</h1>

      <Button
        variant="destructive"
        className="mb-6"
        onClick={() => deleteOtherSessions()}
        disabled={isDeleting}
      >
        {isDeleting ? "Видаляємо..." : "Видалити всі сесії, окрім поточної"}
      </Button>
      {deleteError && (
        <p className="text-red-600 mb-4">Не вдалося видалити сесії</p>
      )}

      <Button className="mt-20" onClick={() => refetch()}>
        Оновити сесії
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>IP-адреса</TableHead>
            <TableHead>Пристрій</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead>Остання активність</TableHead>
            <TableHead>Термін дії</TableHead>
            <TableHead>Поточна сесія</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Сесії не знайдені.
              </TableCell>
            </TableRow>
          )}

          {sessions?.map((session) => (
            <TableRow
              key={session.refresh_token}
              className={cn(
                "cursor-context-menu",
                session.isCurrent && "font-semibold"
              )}
            >
              <TableCell>{session.ip_address || "Невідомо"}</TableCell>
              <TableCell className="break-words max-w-xs">
                {session.user_agent || "Невідомо"}
              </TableCell>
              <TableCell>
                {new Date(session.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {session.last_activity
                  ? new Date(session.last_activity).toLocaleString()
                  : "Ніколи"}
              </TableCell>
              <TableCell>
                {new Date(session.expires_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {session.isCurrent && (
                  <Badge variant="outline" className="text-green-600">
                    Поточна
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SettingsSessions;
