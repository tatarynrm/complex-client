import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Option } from "@/components/ui/multiple-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/axios";

const MESSAGE_PRESETS = [
  "Приїдьте до вашого авто, будь ласка.",
  "Терміново: критична ситуація, зверніться негайно!",
  "Нагадуємо про оплату стоянки.",
];

export function SmsSendTabs({
  smsData,
}: {
  smsData: Option[] | null | undefined;
}) {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [manualMessage, setManualMessage] = useState<string>("");

  // Для модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [sendType, setSendType] = useState<"preset" | "manual" | null>(null);

  const openModal = (type: "preset" | "manual", message: string) => {
    setSendType(type);
    setMessageToSend(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSendType(null);
    setMessageToSend("");
  };

  const confirmSend = async () => {
    // Тут код реальної відправки SMS з messageToSend і smsData
    // alert(
    //   `Відправлено повідомлення:\n"${messageToSend}"\nК-ть отримувачів: ${
    //     smsData?.length || 0
    //   }`
    // );

    // closeModal();

    console.log(smsData, "SMS DATA");
    console.log(messageToSend, "messageToSend messageToSend");

    const data = await api.post("/sms/send", {
      numbers: smsData,
      text: messageToSend,
    });

    console.log(data, "DATA");
    if (data.data) {
      const result = data.data;
      alert(`Відправено ${result?.sent} смс.`);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex w-full  flex-col gap-6">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="flex justify-between w-full">
            <TabsTrigger value="messages">Шаблонна розсилка</TabsTrigger>
            <TabsTrigger value="critical_messages">Ручна розсилка</TabsTrigger>
          </TabsList>

          {/* Шаблонна розсилка */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Обрати шаблон повідомлення</CardTitle>
                <CardDescription>
                  Оберіть готовий шаблон повідомлення для швидкої розсилки.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-3">
                  {MESSAGE_PRESETS.map((msg, idx) => (
                    <label
                      key={idx}
                      className="cursor-pointer flex items-center space-x-3 rounded-md border p-3 hover:bg-muted"
                    >
                      <input
                        type="radio"
                        name="presetMessage"
                        value={msg}
                        checked={selectedPreset === msg}
                        onChange={() => setSelectedPreset(msg)}
                        className="accent-primary"
                      />
                      <span>{msg}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    if (!selectedPreset) {
                      alert("Оберіть шаблон повідомлення.");
                      return;
                    }
                    openModal("preset", selectedPreset);
                  }}
                  disabled={!smsData || smsData.length === 0}
                >
                  Відправити обраний шаблон
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Ручна розсилка */}
          <TabsContent value="critical_messages">
            <Card>
              <CardHeader>
                <CardTitle>Написати власне повідомлення</CardTitle>
                <CardDescription>
                  Введіть текст повідомлення для розсилки вручну.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={6}
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  placeholder="Напишіть ваше повідомлення тут..."
                  className="w-full rounded-md border p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    if (!manualMessage.trim()) {
                      alert("Введіть текст повідомлення.");
                      return;
                    }
                    openModal("manual", manualMessage);
                  }}
                  disabled={!smsData || smsData.length === 0}
                >
                  Відправити вручну введене повідомлення
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Модальне вікно підтвердження */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/95 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Підтвердження відправки
            </h2>
            <p className="font-bold text-base text-red-500 mb-1">
              Підтвердження відправлення на дані номери
            </p>
            {smsData!.length > 0 &&
              smsData!.map((item, idx) => <div key={idx}>{item.label}</div>)}
            <div className="p-2 border-1 rounded-2xl">
              <h1 className="mt-10">Ваше повідомлення:</h1>
              <p className="mb-4 whitespace-pre-wrap">{messageToSend}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={closeModal}>
                Скасувати
              </Button>
              <Button onClick={confirmSend}>Підтвердити та надіслати</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
