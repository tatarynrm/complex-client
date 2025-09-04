import ThemeToggle from "@/components/theme-toggle/ThemeToggleButton";
import LoginForm from "@/features/home/LoginForm";
import React from "react";

const Home = () => {
  return (
    <div className="relative">
      <div className="absolute">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
};

export default Home;
