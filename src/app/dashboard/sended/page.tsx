/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import api from "@/lib/axios";

interface ISmsLog {
  id: number;
  phone: string;
  message: string;
  sent_at: string;
  cost: number;
  full_info: string;
}

const SendedPage = () => {
  const [logs, setLogs] = useState<ISmsLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));


  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sms/logs", {
        params: {
          startDate,
          endDate,

        },
      });
      setLogs(res.data.data || []);
    } catch (error) {
      console.error("Помилка завантаження SMS:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilter = () => {
    fetchLogs();
  };

  return (
<div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Відправлені SMS</h1>

  {/* Фільтри */}
  <div className="flex gap-2 mb-4 flex-col md:flex-row ">
    <div>
      <label>Дата від:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-1 rounded"
      />
    </div>
    <div>
      <label>Дата до:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-1 rounded"
      />
    </div>

    <button
      onClick={handleFilter}
      className="bg-blue-500 text-white px-4 py-1 rounded"
    >
      Застосувати
    </button>
  </div>

  {/* Таблиця */}
  {loading ? (
    <p>Завантаження...</p>
  ) : logs.length === 0 ? (
    <p>Оберіть діапазон дат для фільтрації</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-[600px] w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-black">
            <th className="border p-2">Телефон</th>
            <th className="border p-2">Повідомлення</th>
            <th className="border p-2">Дата</th>
            <th className="border p-2">Вартість</th>
            <th className="border p-2">Info</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border p-2">{log.phone}</td>
              <td className="border p-2">{log.message}</td>
              <td className="border p-2">
                {dayjs(log.sent_at).format("YYYY-MM-DD HH:mm")}
              </td>
              <td className="border p-2">{log.cost} грн</td>
              <td className="border p-2">{log.full_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default SendedPage;
