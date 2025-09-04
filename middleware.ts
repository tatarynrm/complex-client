// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Вкажи маршрути, які потрібно захищати
const protectedPaths = ['/dashboard', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Перевіряємо, чи маршрут захищений
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next(); // дозвіл доступу
  }

  // Отримуємо access_token з cookies
  const accessToken = request.cookies.get('access_token');

  if (!accessToken) {
    // Якщо токена немає, перенаправляємо на логін
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname); // можна додати редірект після логіну
    return NextResponse.redirect(loginUrl);
  }

  // Якщо токен є — пропускаємо
  return NextResponse.next();
}
