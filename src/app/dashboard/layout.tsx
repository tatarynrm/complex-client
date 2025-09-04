import Header from "@/components/header/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const DasbhaordLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token");

  // console.log(refreshToken,'REFRESH TOKEN');
  
  // if (!refreshToken) {
  //   redirect("/");
  // }
  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default DasbhaordLayout;
