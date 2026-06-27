// المسار: vera-law/middleware.ts
// نوع التعديل: حماية رابط لوحة التحكم /admin ومنع الدخول بدون تسجيل

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminPage = path.startsWith("/admin");
  const isLoginPage = path.startsWith("/admin/login");

  if (!isAdminPage || isLoginPage) {
    return NextResponse.next();
  }

  const adminSession = request.cookies.get("vera_admin_session")?.value;

  if (adminSession !== "active") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};