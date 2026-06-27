// المسار: vera-law/app/api/admin/logout/route.ts
// نوع التعديل: تسجيل خروج لوحة التحكم وحذف جلسة المدير

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("vera_admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}