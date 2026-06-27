// المسار: vera-law/app/api/admin/login/route.ts
// نوع التعديل: تسجيل دخول لوحة التحكم بكلمة مرور سرية من السيرفر

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, message: "كلمة مرور المدير غير مضبوطة على السيرفر." },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json(
      { success: false, message: "كلمة المرور غير صحيحة." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("vera_admin_session", "active", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return response;
}