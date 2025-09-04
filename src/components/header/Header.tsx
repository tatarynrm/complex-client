"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import ThemeToggle from "../theme-toggle/ThemeToggleButton";

const navLinks = [
  { href: "/dashboard", label: "Головна" },
  { href: "/dashboard/sended", label: "Відправлені смс" },

  { href: "/admin", label: "Адмін панель", isAdmin: true },
];

export default function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const filteredLinks = navLinks.filter((link) => {
    if (link.isAdmin && !user?.is_admin) return false;
    return true;
  });
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
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/dashboard" className="text-xl font-bold">
          Майновий комплекс
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle/>
        <Button className="hidden md:block" onClick={handleLogout}>
          Вихід
        </Button>
        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <Sheet>
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-base font-medium hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button size="sm" onClick={handleLogout}>
                Вихід
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
