// المسار: vera-law/components/Footer.tsx
// نوع التعديل: فوتر موحد لكل صفحات موقع VERA

import Link from "next/link";

export default function Footer() {
  return (
    <footer dir="rtl" className="border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="mb-2 text-2xl font-black tracking-[0.3em]" dir="ltr">
            VERA
          </h2>
          <p className="mb-4 text-sm text-amber-300" dir="ltr">
            by Ahmed Al-Shamy
          </p>
          <p className="leading-8 text-gray-400">
            حلول قانونية وتجارية واستثمارية بمعايير احترافية تناسب الأفراد
            والشركات والمستثمرين.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-amber-300">
            روابط سريعة
          </h3>

          <div className="space-y-3 text-gray-300">
            <Link href="/" className="block transition hover:text-amber-300">
              الرئيسية
            </Link>
            <Link href="/about" className="block transition hover:text-amber-300">
              من نحن
            </Link>
            <Link href="/services" className="block transition hover:text-amber-300">
              الخدمات
            </Link>
            <Link href="/contact" className="block transition hover:text-amber-300">
              تواصل معنا
            </Link>
            
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-amber-300">
            بيانات التواصل
          </h3>

          <div className="space-y-3 text-gray-300">
            <a
              href="mailto:elshamyahmedmahmoud@gmail.com"
              className="block transition hover:text-amber-300"
              dir="ltr"
            >
              elshamyahmedmahmoud@gmail.com
            </a>

            <a
              href="https://wa.me/201091345672"
              target="_blank"
              className="block transition hover:text-amber-300"
              dir="ltr"
            >
              WhatsApp: +20 109 134 5672
            </a>

            <p>مدينة الحمام - مطروح</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        <p dir="ltr">
          © 2026 VERA by Ahmed Al-Shamy. Legal • Business • Investment Solutions
        </p>
      </div>
    </footer>
  );
}