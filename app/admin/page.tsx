// المسار: vera-law/app/admin/page.tsx
// نوع التعديل: لوحة تحكم VERA مربوطة فعليًا بقاعدة بيانات Supabase

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type ServiceItem = {
  id?: number;
  title: string;
  description: string;
  sort_order: number;
};

type ClientMessage = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  created_at: string;
};

const defaultServices: ServiceItem[] = [
  {
    title: "المحاماة والتقاضي",
    description:
      "تمثيل قانوني أمام المحاكم، إعداد المذكرات، متابعة الجلسات، وصياغة الدفوع القانونية في مختلف المنازعات.",
    sort_order: 1,
  },
  {
    title: "الاستشارات القانونية",
    description:
      "تقديم استشارات قانونية دقيقة للأفراد والشركات لمساعدتهم على فهم الموقف القانوني واتخاذ القرار الصحيح.",
    sort_order: 2,
  },
  {
    title: "تأسيس الشركات وخدمات الأعمال",
    description:
      "تأسيس الشركات، إعداد العقود الداخلية، تنظيم الشراكات، ودعم المشروعات قانونيًا منذ بداية التأسيس وحتى التشغيل.",
    sort_order: 3,
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [settingsId, setSettingsId] = useState<number | null>(null);

  const [email, setEmail] = useState("elshamyahmedmahmoud@gmail.com");
  const [phone, setPhone] = useState("+20 109 134 5672");
  const [whatsapp, setWhatsapp] = useState("201091345672");
  const [address, setAddress] = useState("مدينة الحمام - مطروح");

  const [heroTitle, setHeroTitle] = useState(
    "مؤسسة متخصصة في الخدمات القانونية والتجارية والاستثمارية بمعايير مهنية حديثة"
  );

  const [vision, setVision] = useState(
    "نسعى في VERA إلى إعادة تعريف مفهوم الخدمة القانونية الحديثة، بحيث لا تقتصر على معالجة النزاعات، بل تمتد إلى صناعة القرار، حماية الاستثمار، إدارة المخاطر، وبناء شراكة مهنية طويلة الأمد مع الأفراد والشركات والمستثمرين."
  );

  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [messages, setMessages] = useState<ClientMessage[]>([]);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("vera_admin_auth");

    if (isAuth !== "true") {
      router.push("/admin/login");
      return;
    }

    loadAllData();
  }, [router]);

  async function loadAllData() {
    setError("");

    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from("site_settings")
        .select("*")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (settingsError) {
        console.error(settingsError);
        setError("حدث خطأ أثناء تحميل إعدادات الموقع.");
      }

      if (settingsData) {
        setSettingsId(settingsData.id);
        setEmail(settingsData.email || "elshamyahmedmahmoud@gmail.com");
        setPhone(settingsData.phone || "+20 109 134 5672");
        setWhatsapp(settingsData.whatsapp || "201091345672");
        setAddress(settingsData.address || "مدينة الحمام - مطروح");
        setHeroTitle(
          settingsData.hero_title ||
            "مؤسسة متخصصة في الخدمات القانونية والتجارية والاستثمارية بمعايير مهنية حديثة"
        );
        setVision(
          settingsData.vision ||
            "نسعى في VERA إلى إعادة تعريف مفهوم الخدمة القانونية الحديثة، بحيث لا تقتصر على معالجة النزاعات، بل تمتد إلى صناعة القرار، حماية الاستثمار، إدارة المخاطر، وبناء شراكة مهنية طويلة الأمد مع الأفراد والشركات والمستثمرين."
        );
      }

      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("id, title, description, sort_order")
        .order("sort_order", { ascending: true });

      if (servicesError) {
        console.error(servicesError);
        setError("حدث خطأ أثناء تحميل الخدمات.");
      }

      if (servicesData && servicesData.length > 0) {
        setServices(servicesData);
      }

      const { data: messagesData, error: messagesError } = await supabase
        .from("client_messages")
        .select("id, name, phone, email, message, created_at")
        .order("created_at", { ascending: false });

      if (messagesError) {
        console.error(messagesError);
        setError("حدث خطأ أثناء تحميل رسائل العملاء.");
      }

      if (messagesData) {
        setMessages(messagesData);
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع أثناء تحميل البيانات.");
    } finally {
      setLoaded(true);
    }
  }

  async function saveData() {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const settingsPayload = {
        email,
        phone,
        whatsapp,
        address,
        hero_title: heroTitle,
        vision,
      };

      if (settingsId) {
        const { error: updateError } = await supabase
          .from("site_settings")
          .update(settingsPayload)
          .eq("id", settingsId);

        if (updateError) {
          console.error(updateError);
          setError("حدث خطأ أثناء حفظ إعدادات الموقع.");
          return;
        }
      } else {
        const { data: insertedSettings, error: insertError } = await supabase
          .from("site_settings")
          .insert(settingsPayload)
          .select("id")
          .single();

        if (insertError) {
          console.error(insertError);
          setError("حدث خطأ أثناء إنشاء إعدادات الموقع.");
          return;
        }

        if (insertedSettings) {
          setSettingsId(insertedSettings.id);
        }
      }

      const { error: deleteServicesError } = await supabase
        .from("services")
        .delete()
        .neq("id", 0);

      if (deleteServicesError) {
        console.error(deleteServicesError);
        setError("حدث خطأ أثناء تحديث الخدمات.");
        return;
      }

      const cleanedServices = services
        .filter((service) => service.title.trim() && service.description.trim())
        .map((service, index) => ({
          title: service.title.trim(),
          description: service.description.trim(),
          sort_order: index + 1,
        }));

      if (cleanedServices.length > 0) {
        const { error: insertServicesError } = await supabase
          .from("services")
          .insert(cleanedServices);

        if (insertServicesError) {
          console.error(insertServicesError);
          setError("حدث خطأ أثناء حفظ الخدمات.");
          return;
        }
      }

      setSaved(true);
      await loadAllData();

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع أثناء الحفظ.");
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    localStorage.removeItem("vera_admin_auth");
    router.push("/admin/login");
  }

  function updateService(index: number, field: keyof ServiceItem, value: string) {
    const updated = [...services];

    if (field === "sort_order") {
      updated[index].sort_order = Number(value);
    } else {
      updated[index][field] = value as never;
    }

    setServices(updated);
  }

  function addService() {
    setServices([
      ...services,
      {
        title: "خدمة جديدة",
        description: "اكتب وصف الخدمة هنا.",
        sort_order: services.length + 1,
      },
    ]);
  }

  function removeService(index: number) {
    const updated = services
      .filter((_, itemIndex) => itemIndex !== index)
      .map((service, itemIndex) => ({
        ...service,
        sort_order: itemIndex + 1,
      }));

    setServices(updated);
  }

  async function deleteMessage(id: number) {
    const { error: deleteError } = await supabase
      .from("client_messages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      setError("حدث خطأ أثناء حذف الرسالة.");
      return;
    }

    setMessages(messages.filter((message) => message.id !== id));
  }

  async function clearMessages() {
    const confirmDelete = confirm("هل أنت متأكد من حذف كل رسائل العملاء؟");

    if (!confirmDelete) {
      return;
    }

    const { error: deleteError } = await supabase
      .from("client_messages")
      .delete()
      .neq("id", 0);

    if (deleteError) {
      console.error(deleteError);
      setError("حدث خطأ أثناء حذف كل الرسائل.");
      return;
    }

    setMessages([]);
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
              إدارة بيانات الموقع والخدمات والرؤية ورسائل العملاء من قاعدة
              البيانات.
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
            تم حفظ التعديلات بنجاح في قاعدة البيانات.
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-200">
            {error}
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
            <p className="mb-3 text-gray-300">قاعدة البيانات</p>
            <h2 className="mb-3 text-3xl font-black text-amber-300">Supabase</h2>
            <p className="text-sm leading-7 text-gray-400">
              البيانات محفوظة أونلاين
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
            <p className="mb-3 text-gray-300">حالة الموقع</p>
            <h2 className="mb-3 text-3xl font-black text-amber-300">نشط</h2>
            <p className="text-sm leading-7 text-gray-400">
              يعمل على Vercel
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
                key={`${service.title}-${index}`}
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
                  value={service.description}
                  onChange={(e) =>
                    updateService(index, "description", e.target.value)
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
                        {new Date(message.created_at).toLocaleString("ar-EG")}
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
                      rel="noopener noreferrer"
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
            disabled={saving}
            className="rounded-full bg-amber-400 px-10 py-4 font-black text-black shadow-[0_0_35px_rgba(251,191,36,0.35)] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>

          <a
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-10 py-4 text-center font-black text-white transition hover:bg-white hover:text-black"
          >
            معاينة الموقع
          </a>
        </div>

        <div className="mt-8 rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 text-amber-100">
          البيانات الآن مرتبطة بقاعدة بيانات Supabase. أي تعديل يتم حفظه هنا
          يظهر للزوار بعد تحديث صفحات الموقع.
        </div>
      </section>
    </main>
  );
}