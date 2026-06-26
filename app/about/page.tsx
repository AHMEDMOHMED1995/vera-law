// المسار: vera-law/app/about/page.tsx
// نوع التعديل: صفحة من نحن لموقع VERA

export default function AboutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),linear-gradient(135deg,#050505,#111827)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <a
            href="/"
            className="mb-10 inline-block rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            العودة للرئيسية
          </a>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-2xl md:p-14">
            <p className="mb-4 text-sm font-bold tracking-[0.25em] text-amber-300" dir="ltr">
              ABOUT VERA
            </p>

            <h1 className="mb-8 text-5xl font-black md:text-6xl">
              من نحن
            </h1>

            <p className="mb-8 text-lg leading-9 text-gray-300">
              VERA هي هوية قانونية وتجارية حديثة تقدم خدمات المحاماة،
              الاستشارات القانونية، تأسيس الشركات، صياغة العقود، وخدمات
              الاستثمار بمنهج احترافي يجمع بين الخبرة القانونية والرؤية
              التجارية.
            </p>

            <p className="mb-8 text-lg leading-9 text-gray-300">
              نهدف إلى تقديم تجربة قانونية واضحة وسريعة ومنظمة، تساعد العميل
              على فهم موقفه القانوني واتخاذ القرار الصحيح بثقة، سواء كان فردًا
              أو شركة أو مستثمرًا.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
                <h3 className="mb-3 text-2xl font-bold text-amber-300">
                  الثقة
                </h3>
                <p className="leading-8 text-gray-300">
                  التعامل مع الملفات القانونية بجدية ووضوح وسرية كاملة.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
                <h3 className="mb-3 text-2xl font-bold text-amber-300">
                  الاحتراف
                </h3>
                <p className="leading-8 text-gray-300">
                  صياغة قانونية دقيقة وخدمة منظمة تناسب الأفراد والشركات.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
                <h3 className="mb-3 text-2xl font-bold text-amber-300">
                  الرؤية
                </h3>
                <p className="leading-8 text-gray-300">
                  قانون بفكر تجاري يدعم القرار ويحمي الاستثمار.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}