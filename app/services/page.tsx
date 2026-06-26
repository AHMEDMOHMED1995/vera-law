// المسار: vera-law/app/services/page.tsx
// نوع التعديل: ربط صفحة الخدمات ببيانات لوحة التحكم المحفوظة محليًا

"use client";

import { useEffect, useState } from "react";

type ServiceItem = {
  title: string;
  text: string;
};

const defaultServices: ServiceItem[] = [
  {
    title: "المحاماة والتقاضي",
    text: "تمثيل قانوني أمام المحاكم، إعداد المذكرات، إدارة القضايا، متابعة الجلسات، وصياغة الدفوع القانونية.",
  },
  {
    title: "الاستشارات القانونية",
    text: "استشارات قانونية للأفراد والشركات في المسائل المدنية والتجارية والجنائية والعقارية.",
  },
  {
    title: "تأسيس الشركات",
    text: "إجراءات تأسيس الشركات، العقود الداخلية، الحوكمة، وحماية المصالح القانونية.",
  },
  {
    title: "العقود والتوثيق",
    text: "صياغة ومراجعة عقود البيع، الإيجار، الشراكة، المقاولات، ومحاضر الاتفاق.",
  },
  {
    title: "الاستثمار والتطوير العقاري",
    text: "فحص المستندات، التفاوض، التعاقد، ومتابعة الإجراءات أمام الجهات الرسمية.",
  },
  {
    title: "الخدمات القانونية الرقمية",
    text: "تنظيم الملفات، أرشفة المستندات، متابعة القضايا، وتسهيل التواصل مع العملاء.",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  useEffect(() => {
    const savedData = localStorage.getItem("vera_site_data");

    if (savedData) {
      const data = JSON.parse(savedData);
      setServices(data.services || defaultServices);
    }
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-white text-black">
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-600"
              dir="ltr"
            >
              VERA SERVICES
            </p>

            <h1 className="text-5xl font-black md:text-6xl">خدماتنا</h1>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600">
              نقدم خدمات قانونية وتجارية متكاملة مصممة لتلبية احتياجات العملاء
              الأفراد والشركات والمستثمرين، ويتم تحديث هذه الخدمات من لوحة
              التحكم.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={`${service.title}-${index}`}
                className="group rounded-[2rem] border border-gray-200 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_35px_100px_rgba(0,0,0,0.14)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-lg font-black text-amber-300 transition group-hover:bg-amber-400 group-hover:text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2 className="mb-4 text-2xl font-bold">{service.title}</h2>

                <p className="leading-8 text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] bg-black p-8 text-center text-white">
            <h2 className="mb-4 text-3xl font-black">
              تحتاج خدمة قانونية مخصصة؟
            </h2>

            <p className="mx-auto mb-8 max-w-3xl leading-8 text-gray-300">
              يمكنك التواصل معنا لشرح موقفك القانوني أو التجاري، وسيتم توجيهك
              إلى الحل الأنسب وفقًا لطبيعة الملف.
            </p>

            <a
              href="/contact"
              className="inline-block rounded-full bg-amber-400 px-8 py-4 font-bold text-black transition hover:bg-amber-300"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}