// app/pricing/page.tsx
import { Button } from "@/components/ui/button";
import React from "react";

const plans = [
  {
    name: "Basic",
    price: 50,
    description: "Для короткочасної стоянки",
    features: ["Максимум 2 години", "Охорона 24/7", "Безкоштовний Wi-Fi"],
  },
  {
    name: "Standard",
    price: 150,
    description: "Для денного паркування",
    features: [
      "Максимум 12 годин",
      "Охорона 24/7",
      "Камери відеоспостереження",
      "Можливість бронювання",
    ],
  },
  {
    name: "Premium",
    price: 300,
    description: "Для довготривалої стоянки",
    features: [
      "Без обмеження по часу",
      "Персональне місце",
      "Охорона 24/7",
      "Відеоспостереження",
      "Бронювання та знижки",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Тарифи за стоянку
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Оберіть найкращий тариф для вашого автомобіля
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {plan.price} грн
              <span className="text-base font-normal text-gray-500">
                {" "}
                / день
              </span>
            </p>
            <p className="mt-4 text-gray-700">{plan.description}</p>

            <ul role="list" className="mt-6 space-y-2 text-gray-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>

            <Button type="button" className="w-full mt-4">Обрати тариф</Button>
          </div>
        ))}
      </div>
    </main>
  );
}
