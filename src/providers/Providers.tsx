import React from "react";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>
          <StoreProvider>{children}</StoreProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
