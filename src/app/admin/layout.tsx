"use client";


import AdminHeader from "@/components/header/AdminHeader";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [checked, setChecked] = useState(false); // Додатковий стан, щоб не показувати контент до перевірки

  useEffect(() => {
    if (user === null) return; // ще немає даних про користувача

    if (!user?.is_admin) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [user, router]);

  if (!checked) {
    return null; // або спінер <LoadingSpinner />
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
