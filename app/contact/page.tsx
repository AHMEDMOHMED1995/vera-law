// المسار: vera-law/app/contact/page.tsx
// نوع التعديل: فورم تواصل فعلي يحفظ رسائل العملاء في localStorage

"use client";

import { useEffect, useState } from "react";

type ClientMessage = {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
};

export default function ContactPage() {
  const [email, setEmail] = useState("elshamyahmedmahmoud@gmail.com");
  const [phone, setPhone] = useState("+20 109 134 5672");
  const [whatsapp, setWhatsapp] = useState("201091345672");
  const [address, setAddress] = useState("مدينة الحمام - مطروح");

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("vera_site_data");

    if (savedData) {
      const data = JSON.parse(savedData);

      setEmail(data.email || "elshamyahmedmahmoud@gmail.com");
      setPhone(data.phone || "+20 109 134 5672");
      setWhatsapp(data.whatsapp || "201091345672");
      setAddress(data.address || "مدينة الحمام - مطروح");
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!clientName.trim() || !clientPhone.trim() || !clientMessage.trim()) {
      setError("من فضلك اكتب الاسم ورقم الهاتف وتفاصيل الرسالة.");
      setSent(false);
      return;
    }

    const newMessage: ClientMessage = {
      id: Date.now(),
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      message: clientMessage,
      date: new Date().toLocaleString("ar-EG"),
    };

    const oldMessages = localStorage.getItem("vera_client_messages");
    const messages: ClientMessage[] = oldMessages ? JSON.parse(oldMessages) : [];

    const updatedMessages = [newMessage, ...messages];

    localStorage.setItem(
      "vera_client_messages",
      JSON.stringify(updatedMessages)
    );

    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setClientMessage("");
    setError("");
    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3500);
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

              <div className="space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="block rounded-2xl border border-white/10 bg-white/10 p-5 text-white transition hover:bg-white hover:text-black"
                  dir="ltr"
                >
                  {email}
                </a>

                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  className="block rounded-2xl border border-white/10 bg-amber-400 p-5 font-bold text-black transition hover:bg-amber-300"
                  dir="ltr"
                >
                  WhatsApp: {phone}
                </a>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white">
                  {address}
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
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition focus:border-amber-300"
              />

              <input
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="رقم الهاتف"
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition focus:border-amber-300"
                dir="ltr"
              />

              <input
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="البريد الإلكتروني - اختياري"
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition focus:border-amber-300 md:col-span-2"
                dir="ltr"
              />

              <textarea
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="اكتب تفاصيل الاستشارة أو الرسالة"
                rows={6}
                className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none transition focus:border-amber-300 md:col-span-2"
              />

              <button
                type="submit"
                className="rounded-full bg-amber-400 px-8 py-4 font-black text-black transition hover:bg-amber-300 md:col-span-2"
              >
                إرسال الطلب
              </button>
            </form>

            <p className="mt-5 text-sm text-gray-400">
              الرسائل محفوظة حاليًا على نفس الجهاز والمتصفح، وستظهر داخل لوحة
              التحكم في قسم رسائل العملاء.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}