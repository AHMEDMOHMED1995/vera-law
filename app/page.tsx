// المسار: vera-law/app/page.tsx
// نوع التعديل: صفحة VERA كاملة بخلفية واضحة خفيفة التعتيم + حركة سينمائية + خدمات + رؤية + تواصل + Google Map

const services = [
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
  {
    title: "الاستثمار والتطوير العقاري",
    text: "دعم المستثمرين في التفاوض، التعاقد، فحص المستندات، ومتابعة الإجراءات أمام الجهات الرسمية.",
  },
  {
    title: "العقود والتوثيق",
    text: "صياغة ومراجعة عقود البيع، الإيجار، الشراكة، المقاولات، الاتفاقيات التجارية، ومحاضر الاتفاق.",
  },
  {
    title: "الخدمات القانونية الرقمية",
    text: "تنظيم الملفات، متابعة القضايا، أرشفة المستندات، وتقديم تجربة قانونية حديثة وسريعة التواصل.",
  },
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* صورة الخلفية المتحركة */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="ocean-background absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/north-coast.jpg')",
            }}
          />
        </div>

        {/* طبقة تغميق خفيفة جدًا فوق الصورة */}
        <div className="absolute inset-0 bg-black/12" />

        {/* تدرج خفيف لحماية وضوح النص بدون تغميق الصورة */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.15)_45%,rgba(0,0,0,0.03)_100%)]" />

        {/* لمسات ضوء خفيفة */}
        <div className="absolute left-[-120px] top-20 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-sky-400/5 blur-3xl" />

        

        {/* Hero Content حر بدون مستطيل كبير */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-110px)] max-w-7xl items-center px-6 py-16">
          <div className="max-w-5xl">
            <p
              className="mb-6 inline-flex rounded-full border border-amber-300/40 bg-black/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-amber-300 shadow-2xl backdrop-blur-md"
              dir="ltr"
            >
              LEGAL • BUSINESS • INVESTMENT
            </p>

            <h2
              className="mb-4 text-7xl font-black leading-none tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] md:text-9xl"
              dir="ltr"
            >
              VERA
            </h2>

            <p
              className="mb-5 text-xl text-gray-100 drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]"
              dir="ltr"
            >
              by Ahmed Al-Shamy
            </p>

            <h3 className="mb-7 max-w-4xl text-4xl font-black leading-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] md:text-6xl">
              حلول قانونية وتجارية واستثمارية بمعايير دولية
            </h3>

            <p className="mb-10 max-w-3xl text-lg leading-9 text-gray-50 drop-shadow-[0_6px_22px_rgba(0,0,0,0.9)]">
              منصة قانونية حديثة تقدم خدمات المحاماة، الاستشارات، تأسيس الشركات،
              العقود، ودعم الاستثمار، بهوية راقية تناسب الساحل الشمالي والعلمين
              الجديدة وبيئة الأعمال الحديثة.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#services"
                className="rounded-full bg-amber-400 px-8 py-4 text-center font-bold text-black shadow-[0_0_35px_rgba(251,191,36,0.45)] transition hover:bg-amber-300"
              >
                استكشف الخدمات
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/35 bg-black/20 px-8 py-4 text-center font-bold text-white shadow-2xl backdrop-blur-xl transition hover:bg-white hover:text-black"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative bg-[#070707] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300"
              dir="ltr"
            >
              ABOUT VERA
            </p>

            <h2 className="mb-6 text-4xl font-bold">
              هوية قانونية راقية برؤية عصرية
            </h2>

            <p className="leading-9 text-gray-300">
              VERA ليست مجرد واجهة تعريفية، بل هوية قانونية رقمية تجمع بين
              الثقة، الاحتراف، والوضوح. الهدف هو تقديم خدمات قانونية وتجارية
              بطريقة تناسب العملاء الأفراد، الشركات، والمستثمرين داخل مصر
              وخارجها.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-300/10 to-white/[0.04] p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300"
              dir="ltr"
            >
              WHY VERA
            </p>

            <h2 className="mb-6 text-4xl font-bold">
              ثقة قانونية وسرعة في القرار
            </h2>

            <p className="leading-9 text-gray-300">
              نركز على تقديم المعلومة القانونية بوضوح، وبناء حلول عملية تساعد
              العميل في اتخاذ القرار الصحيح، سواء في نزاع قضائي، تأسيس مشروع،
              أو صفقة استثمارية.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-600"
              dir="ltr"
            >
              OUR SERVICES
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              خدمات قانونية وتجارية متكاملة
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-600">
              نقدم باقة خدمات مصممة لتغطية احتياجات الأفراد والشركات والمستثمرين
              من بداية الاستشارة وحتى إتمام الإجراءات.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group rounded-[2rem] border border-gray-200 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_35px_100px_rgba(0,0,0,0.14)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-lg font-black text-amber-300 transition group-hover:bg-amber-400 group-hover:text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>

                <p className="leading-8 text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section
        id="vision"
        className="relative overflow-hidden bg-[#050505] px-6 py-24"
      >
        <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-8 text-center shadow-2xl backdrop-blur-2xl md:p-14">
          <p
            className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300"
            dir="ltr"
          >
            OUR VISION
          </p>

          <h2 className="mb-6 text-4xl font-black md:text-5xl">
            قانون بفكر تجاري ورؤية استثمارية
          </h2>

          <p className="mx-auto max-w-4xl text-lg leading-9 text-gray-300">
            رؤيتنا أن الخدمة القانونية الحديثة لا تقتصر على حل النزاعات، بل
            تمتد إلى حماية القرار التجاري، دعم الاستثمار، إدارة المخاطر، وبناء
            علاقة ثقة طويلة المدى مع العميل.
          </p>
        </div>
      </section>

      {/* CONTACT + MAP */}
      <section id="contact" className="relative bg-[#0b0b0b] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-amber-300/10 to-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl md:p-10">
            <p
              className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300"
              dir="ltr"
            >
              CONTACT
            </p>

            <h2 className="mb-6 text-4xl font-black">تواصل معنا</h2>

            <p className="mb-8 leading-8 text-gray-300">
              يمكنك التواصل معنا لحجز استشارة، مناقشة ملف قانوني، طلب صياغة عقد،
              أو الاستفسار عن خدمات الشركات والاستثمار.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:elshamyahmedmahmoud@gmail.com"
                className="block rounded-2xl border border-white/10 bg-white/10 p-5 text-white transition hover:bg-white hover:text-black"
                dir="ltr"
              >
                elshamyahmedmahmoud@gmail.com
              </a>

              <a
                href="https://wa.me/201091345672"
                target="_blank"
                className="block rounded-2xl border border-white/10 bg-amber-400 p-5 font-bold text-black transition hover:bg-amber-300"
                dir="ltr"
              >
                WhatsApp: +20 109 134 5672
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
            <iframe
              title="VERA Location Map"
              src="https://www.google.com/maps?q=El%20Hammam%2C%20Matrouh%2C%20Egypt&output=embed"
              className="h-[430px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      
    </main>
  );
}