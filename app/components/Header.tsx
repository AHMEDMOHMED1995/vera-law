// المسار: vera-law/components/Header.tsx
// نوع التعديل: هيدر موحد لكل صفحات موقع VERA

import Link from "next/link";

export default function Header() {
  return (
    <header
      dir="rtl"
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/30 px-5 py-3 shadow-2xl backdrop-blur-2xl">
        <Link href="/" className="text-left" dir="ltr">
          <h1 className="text-xl font-black tracking-[0.3em] text-white drop-shadow-xl">
            VERA
          </h1>
          <p className="text-[11px] tracking-[0.18em] text-amber-300">
            by Ahmed Al-Shamy
          </p>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-gray-100 md:flex">
          <Link href="/" className="transition hover:text-amber-300">
            الرئيسية
          </Link>

          <Link href="/about" className="transition hover:text-amber-300">
            من نحن
          </Link>

          <Link href="/services" className="transition hover:text-amber-300">
            الخدمات
          </Link>

          <Link href="/contact" className="transition hover:text-amber-300">
            تواصل معنا
          </Link>

        
          
        </div>

        <a
          href="https://wa.me/201091345672"
          target="_blank"
          className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-black shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-300"
        >
          واتساب
        </a>
      </nav>
    </header>
  );
}