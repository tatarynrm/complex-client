"use client";

import { ChevronLeftIcon, Menu } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RootState } from "@/store/store";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/admin", label: "Головна адмін сторінка", isAdmin: true },
  { href: "/admin/users", label: "Користувачі", isAdmin: true },
];

export default function AdminHeader() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false); // стан для Sheet

  const handleLogout = async () => {
    try {
      const { data } = await api.get("/auth/logout");
      if (data.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLinks = navLinks.filter((link) => {
    if (link.isAdmin && !user?.is_admin) return false;
    return true;
  });

  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex text-center items-center gap-10">
          <Button
            variant="secondary"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => router.replace("/dashboard")}
          >
            <ChevronLeftIcon />
          </Button>
          <Link href="/admin" className="text-xl font-bold">
            Адмін Панель
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <Button className="hidden md:block" size="sm" onClick={handleLogout}>
          Вихід
        </Button>

        {/* Mobile Burger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-2">
              <SheetHeader>
                <span className="text-lg font-bold">Меню</span>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {filteredLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-base font-medium hover:underline"
                    onClick={() => setIsSheetOpen(false)} // закриваємо Sheet при кліку
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    handleLogout();
                    setIsSheetOpen(false); // закриваємо Sheet після виходу
                  }}
                >
                  Вийти
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
