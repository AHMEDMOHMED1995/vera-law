// المسار: vera-law/app/admin/login/page.tsx
// نوع التعديل: صفحة دخول آمنة للوحة التحكم باستخدام API server-side

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "كلمة المرور غير صحيحة.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] px-6 pb-24 pt-36 text-white">
      <section className="mx-auto max-w-xl rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-2xl md:p-10">
        <p className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300" dir="ltr">
          VERA ADMIN LOGIN
        </p>

        <h1 className="mb-6 text-4xl font-black">دخول لوحة التحكم</h1>

        <p className="mb-8 leading-8 text-gray-300">
          أدخل كلمة مرور المدير للوصول إلى لوحة إدارة الموقع.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="اكتب كلمة المرور"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition focus:border-amber-300"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-amber-400 px-8 py-4 font-black text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </section>
    </main>
  );
}