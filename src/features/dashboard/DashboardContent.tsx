/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { SmsSendTabs } from "@/features/dashboard/SmsSendTabs";
import api from "@/lib/axios";
import { normalizePhones } from "@/utils/phones";
import { useEffect, useState } from "react";

export default function DashboardContent() {
  const [values, setValues] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const getAllCars = async () => {
      try {
        const { data } = await api.get("/parking/all");

        // Створюємо список опцій
        const optionsFromDb: Option[] = data.map((item: any) => {
          const normalizedPhone = normalizePhones(item?.TELEFON);
          return {
            label: `Місце: ${item.PLACE} [ ${item.DERNOM} ] ${
              normalizedPhone ? normalizedPhone : "Телефон не коректний"
            } ${item.VLAS}`,
            value: normalizedPhone,
          };
        });

        setCars(data); // залишаємо, якщо потрібно десь ще
        setOptions(optionsFromDb); // встановлюємо у селект одразу
      } catch (error) {
        console.log(error);
      }
    };

    getAllCars();
  }, []);

  return (
    <div className="min-h-screen bg-muted/50 mt-10  ">
      <div className="  space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Обрати машини для розсилки SMS</h1>
          <p className="text-muted-foreground mt-2">
            Виберіть одне або кілька авто, щоб надіслати їм повідомлення.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-2">
                Список машин
              </label>
              {options.length > 0 && (
                <MultipleSelector
                  className="w-full"
                  defaultOptions={options}
                  placeholder="Оберіть зі списку"
                  onChange={(values) => {
                    setValues(values);
                  }}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Машин не знайдено
                    </p>
                  }
                />
              )}
            </div>
          </div>

          {values.length > 0 && (
            <div className="pt-10 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Надіслати SMS {values.length} користувачам
              </h2>
              <SmsSendTabs smsData={values} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
