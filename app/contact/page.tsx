// المسار: vera-law/app/contact/page.tsx
// نوع التعديل: ربط صفحة التواصل وقسم طلب الاستشارة بقاعدة بيانات Supabase بدل localStorage

"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type SiteSettings = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
};

const defaultSettings: SiteSettings = {
  email: "elshamyahmedmahmoud@gmail.com",
  phone: "+20 109 134 5672",
  whatsapp: "201091345672",
  address: "مدينة الحمام - مطروح",
};

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error: settingsError } = await supabase
          .from("site_settings")
          .select("email, phone, whatsapp, address")
          .order("id", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (settingsError) {
          console.error("Supabase settings error:", settingsError);
          return;
        }

        if (data) {
          setSettings({
            email: data.email || defaultSettings.email,
            phone: data.phone || defaultSettings.phone,
            whatsapp: data.whatsapp || defaultSettings.whatsapp,
            address: data.address || defaultSettings.address,
          });
        }
      } catch (err) {
        console.error("Load settings failed:", err);
      } finally {
        setSettingsLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = clientName.trim();
    const phone = clientPhone.trim();
    const email = clientEmail.trim();
    const message = clientMessage.trim();

    if (!name || !phone || !message) {
      setError("من فضلك اكتب الاسم ورقم الهاتف وتفاصيل الرسالة.");
      setSent(false);
      return;
    }

    setLoading(true);
    setError("");
    setSent(false);

    try {
      const { error: insertError } = await supabase
        .from("client_messages")
        .insert({
          name,
          phone,
          email: email || null,
          message,
        });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        setError("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
        return;
      }

      setClientName("");
      setClientPhone("");
      setClientEmail("");
      setClientMessage("");
      setSent(true);

      setTimeout(() => {
        setSent(false);
      }, 3500);
    } catch (err) {
      console.error("Submit failed:", err);
      setError("حدث خطأ غير متوقع أثناء الإرسال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300"
              dir="ltr"
            >
              CONTACT VERA
            </p>

            <h1 className="text-5xl font-black md:text-6xl">تواصل معنا</h1>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-300">
              يمكنك التواصل معنا لحجز استشارة، مناقشة ملف قانوني، طلب صياغة
              عقد، أو الاستفسار عن خدمات الشركات والاستثمار.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/10 to-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl md:p-10">
              <h2 className="mb-6 text-3xl font-black">بيانات التواصل</h2>

              {settingsLoading && (
                <div className="mb-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-gray-300">
                  جاري تحميل بيانات التواصل...
                </div>
              )}

              <div className="space-y-4">
                <a
                  href={`mailto:${settings.email}`}
                  className="block rounded-2xl border border-white/10 bg-white/10 p-5 text-white transition hover:bg-white hover:text-black"
                  dir="ltr"
                >
                  {settings.email}
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/10 bg-amber-400 p-5 font-bold text-black transition hover:bg-amber-300"
                  dir="ltr"
                >
                  WhatsApp: {settings.phone}
                </a>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white">
                  {settings.address}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
                <h3 className="mb-3 text-xl font-bold text-amber-300">
                  مواعيد التواصل
                </h3>

                <p className="leading-8 text-gray-300">
                  يمكنك إرسال رسالة أو طلب استشارة في أي وقت، وسيتم التواصل معك
                  في أقرب وقت متاح.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
              <iframe
                title="VERA Location Map"
                src="https://www.google.com/maps?q=El%20Hammam%2C%20Matrouh%2C%20Egypt&output=embed"
                className="h-[560px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl">
            <h2 className="mb-6 text-3xl font-black">طلب استشارة</h2>

            {sent && (
              <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-5 text-green-200">
                تم إرسال طلبك بنجاح، وسيتم التواصل معك قريبًا.
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="الاسم"
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-300"
              />

              <input
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="رقم الهاتف"
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-300"
                dir="ltr"
              />

              <input
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="البريد الإلكتروني - اختياري"
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-300 md:col-span-2"
                dir="ltr"
              />

              <textarea
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="اكتب تفاصيل الاستشارة أو الرسالة"
                rows={6}
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-300 md:col-span-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-amber-400 px-8 py-4 font-black text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              >
                {loading ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>
            </form>

            <p className="mt-5 text-sm text-gray-400">
              سيتم حفظ طلبك في قاعدة بيانات الموقع، ويظهر داخل لوحة التحكم.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}