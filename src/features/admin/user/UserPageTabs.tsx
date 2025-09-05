"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersList from "./UsersList";
import CreateUserForm from "./CreateUserForm";

const UserPageTabs = () => {
  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Список користувачів</TabsTrigger>
        <TabsTrigger value="create">Створити користувача</TabsTrigger>
      </TabsList>

      {/* Таб з користувачами */}
      <TabsContent value="list">
        <UsersList />
      </TabsContent>

      {/* Таб з формою */}
      <TabsContent value="create">
        <CreateUserForm />
      </TabsContent>
    </Tabs>
  );
};

export default UserPageTabs;
