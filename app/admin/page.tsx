// المسار: vera-law/app/admin/page.tsx
// نوع التعديل: لوحة تحكم فعلية مبدئية لإدارة بيانات VERA + عرض رسائل العملاء

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ServiceItem = {
  title: string;
  text: string;
};

type ClientMessage = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
};

const defaultServices: ServiceItem[] = [
  {
    title: "المحاماة والتقاضي",
    text: "تمثيل قانوني أمام المحاكم، إعداد المذكرات، إدارة القضايا، متابعة الجلسات، وصياغة الدفوع القانونية باحتراف.",
  },
  {
    title: "الاستشارات القانونية",
    text: "استشارات دقيقة للأفراد والشركات في المسائل المدنية والتجارية والجنائية والأحوال الشخصية والعقارية.",
  },
  {
    title: "الشركات والأعمال",
    text: "تأسيس الشركات، صياغة العقود، مراجعة الاتفاقيات، الحوكمة، وتقديم الدعم القانوني للمشروعات التجارية.",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  const [email, setEmail] = useState("elshamyahmedmahmoud@gmail.com");
  const [phone, setPhone] = useState("+20 109 134 5672");
  const [whatsapp, setWhatsapp] = useState("201091345672");
  const [address, setAddress] = useState("مدينة الحمام - مطروح");

  const [heroTitle, setHeroTitle] = useState(
    "حلول قانونية وتجارية واستثمارية بمعايير دولية"
  );

  const [vision, setVision] = useState(
    "رؤيتنا أن الخدمة القانونية الحديثة لا تقتصر على حل النزاعات، بل تمتد إلى حماية القرار التجاري، دعم الاستثمار، إدارة المخاطر، وبناء علاقة ثقة طويلة المدى مع العميل."
  );

  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("vera_admin_auth");

    if (isAuth !== "true") {
      router.push("/admin/login");
      return;
    }

    const savedData = localStorage.getItem("vera_site_data");

    if (savedData) {
      const data = JSON.parse(savedData);

      setEmail(data.email || "elshamyahmedmahmoud@gmail.com");
      setPhone(data.phone || "+20 109 134 5672");
      setWhatsapp(data.whatsapp || "201091345672");
      setAddress(data.address || "مدينة الحمام - مطروح");
      setHeroTitle(
        data.heroTitle ||
          "حلول قانونية وتجارية واستثمارية بمعايير دولية"
      );
      setVision(
        data.vision ||
          "رؤيتنا أن الخدمة القانونية الحديثة لا تقتصر على حل النزاعات، بل تمتد إلى حماية القرار التجاري، دعم الاستثمار، إدارة المخاطر، وبناء علاقة ثقة طويلة المدى مع العميل."
      );
      setServices(data.services || defaultServices);
    }

    const savedMessages = localStorage.getItem("vera_client_messages");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    setLoaded(true);
  }, [router]);

  function saveData() {
    const data = {
      email,
      phone,
      whatsapp,
      address,
      heroTitle,
      vision,
      services,
    };

    localStorage.setItem("vera_site_data", JSON.stringify(data));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function logout() {
    localStorage.removeItem("vera_admin_auth");
    router.push("/admin/login");
  }

  function updateService(index: number, field: keyof ServiceItem, value: string) {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  }

  function addService() {
    setServices([
      ...services,
      {
        title: "خدمة جديدة",
        text: "اكتب وصف الخدمة هنا.",
      },
    ]);
  }

  function removeService(index: number) {
    const updated = services.filter((_, itemIndex) => itemIndex !== index);
    setServices(updated);
  }

  function deleteMessage(id: number) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem(
      "vera_client_messages",
      JSON.stringify(updatedMessages)
    );
  }

  function clearMessages() {
    const confirmDelete = confirm("هل أنت متأكد من حذف كل رسائل العملاء؟");

    if (!confirmDelete) {
      return;
    }

    setMessages([]);
    localStorage.removeItem("vera_client_messages");
  }

  if (!loaded) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#050505] px-6 pt-36 text-white"
      >
        <p className="text-center text-gray-300">جاري فتح لوحة التحكم...</p>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#050505] px-6 pb-24 pt-36 text-white"
    >
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-2xl md:flex-row md:items-center">
          <div>
            <p
              className="mb-2 text-sm font-bold tracking-[0.25em] text-amber-300"
              dir="ltr"
            >
              VERA ADMIN PANEL
            </p>

            <h1 className="text-4xl font-black">لوحة التحكم</h1>

            <p className="mt-3 text-gray-300">
              إدارة بيانات التواصل والخدمات والرؤية ورسائل العملاء.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center font-bold text-white transition hover:bg-white hover:text-black"
            >
              عرض الموقع
            </a>

            <button
              onClick={logout}
              className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-400"
            >
              خروج
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-8 rounded-2xl border border-green-400/30 bg-green-400/10 p-5 text-green-200">
            تم حفظ البيانات بنجاح على هذا الجهاز.
          </div>
        )}

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-gray-300">الخدمات</p>
            <h2 className="mb-3 text-4xl font-black text-amber-300">
              {services.length}
            </h2>
            <p className="text-sm leading-7 text-gray-400">
              عدد الخدمات المعروضة بالموقع
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-gray-300">رسائل العملاء</p>
            <h2 className="mb-3 text-4xl font-black text-amber-300">
              {messages.length}
            </h2>
            <p className="text-sm leading-7 text-gray-400">
              طلبات الاستشارة المسجلة
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-gray-300">البريد</p>
            <h2 className="mb-3 text-2xl font-black text-amber-300" dir="ltr">
              Active
            </h2>
            <p className="text-sm leading-7 text-gray-400">
              بيانات التواصل مفعلة
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-gray-300">حالة الموقع</p>
            <h2 className="mb-3 text-3xl font-black text-amber-300">نشط</h2>
            <p className="text-sm leading-7 text-gray-400">
              يعمل محليًا على جهازك
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black">بيانات التواصل</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  البريد الإلكتروني
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  رقم الهاتف الظاهر
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  رقم واتساب بدون +
                </label>
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  العنوان
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black">نصوص الموقع</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  عنوان الصفحة الرئيسية
                </label>
                <textarea
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  الرؤية
                </label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-amber-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-black">إدارة الخدمات</h2>
              <p className="mt-2 text-gray-400">
                يمكنك تعديل أسماء الخدمات ووصفها أو إضافة خدمة جديدة.
              </p>
            </div>

            <button
              onClick={addService}
              className="rounded-full bg-amber-400 px-6 py-3 font-bold text-black transition hover:bg-amber-300"
            >
              إضافة خدمة
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-white/10 bg-black/30 p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-amber-400 px-4 py-1 text-sm font-black text-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <button
                    onClick={() => removeService(index)}
                    className="rounded-full bg-red-500/20 px-4 py-1 text-sm text-red-200 transition hover:bg-red-500 hover:text-white"
                  >
                    حذف
                  </button>
                </div>

                <label className="mb-2 block text-sm text-gray-300">
                  اسم الخدمة
                </label>
                <input
                  value={service.title}
                  onChange={(e) =>
                    updateService(index, "title", e.target.value)
                  }
                  className="mb-4 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-amber-300"
                />

                <label className="mb-2 block text-sm text-gray-300">
                  وصف الخدمة
                </label>
                <textarea
                  value={service.text}
                  onChange={(e) =>
                    updateService(index, "text", e.target.value)
                  }
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-amber-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-black">رسائل العملاء</h2>
              <p className="mt-2 text-gray-400">
                الرسائل المرسلة من نموذج طلب الاستشارة في صفحة التواصل.
              </p>
            </div>

            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-400"
              >
                حذف كل الرسائل
              </button>
            )}
          </div>

          {messages.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-center text-gray-400">
              لا توجد رسائل عملاء حتى الآن.
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-[2rem] border border-white/10 bg-black/30 p-6"
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <h3 className="text-2xl font-black text-amber-300">
                        {message.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {message.date}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="rounded-full bg-red-500/20 px-5 py-2 text-sm text-red-200 transition hover:bg-red-500 hover:text-white"
                    >
                      حذف الرسالة
                    </button>
                  </div>

                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="mb-1 text-sm text-gray-400">الهاتف</p>
                      <p dir="ltr">{message.phone}</p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="mb-1 text-sm text-gray-400">
                        البريد الإلكتروني
                      </p>
                      <p dir="ltr">{message.email || "غير مسجل"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="mb-2 text-sm text-gray-400">نص الرسالة</p>
                    <p className="leading-8 text-gray-200">
                      {message.message}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`https://wa.me/${message.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      className="rounded-full bg-amber-400 px-5 py-2 text-center font-bold text-black transition hover:bg-amber-300"
                    >
                      رد واتساب
                    </a>

                    {message.email && (
                      <a
                        href={`mailto:${message.email}`}
                        className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-center font-bold text-white transition hover:bg-white hover:text-black"
                      >
                        رد بالبريد
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={saveData}
            className="rounded-full bg-amber-400 px-10 py-4 font-black text-black shadow-[0_0_35px_rgba(251,191,36,0.35)] transition hover:bg-amber-300"
          >
            حفظ التعديلات
          </button>

          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-10 py-4 text-center font-black text-white transition hover:bg-white hover:text-black"
          >
            معاينة الموقع
          </a>
        </div>

        <div className="mt-8 rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 text-amber-100">
          هذه لوحة تحكم مبدئية تحفظ البيانات والرسائل على نفس المتصفح فقط.
          المرحلة التالية هي ربطها بقاعدة بيانات حتى تعمل أونلاين لكل الزوار.
        </div>
      </section>
    </main>
  );
}