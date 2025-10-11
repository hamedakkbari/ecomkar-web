'use client';

import { useEffect } from 'react';
import courseContent from '../../../lib/content/pages/course';

export default function CoursePageClient() {
  useEffect(() => {
    // Analytics: Track page view
    if (typeof window !== 'undefined') {
      const ev = new CustomEvent('analytics', { 
        detail: { action: 'view_page_course' } 
      });
      window.dispatchEvent(ev);
    }
  }, []);

  const { hero, highlights, curriculum, pricing, faqs, ctas } = courseContent;

  return (
    <div data-analytics="view_page_course" className="relative bg-black text-white overflow-hidden">
      {/* Luxe background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/[0.08] blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[90px]" />
      </div>

      <section className="relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
              {hero.heading}
            </h1>
            
            <p className="inline-block mx-auto text-xl text-gray-300/90 leading-relaxed mb-10">
              {hero.sub}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-amber-200/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:bg-white/[0.07] hover:border-amber-400/30 hover:shadow-amber-500/10"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-25" />
                  <span className="relative z-10 text-sm tracking-tight">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ctas.primary.href}
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-amber-500/10 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black"
                data-analytics="click_course_enroll"
              >
                {ctas.primary.label}
              </a>
              
              {ctas.secondary && (
                <a
                  href={ctas.secondary.href}
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-amber-400/30 hover:border-amber-300/60 bg-amber-50/5 hover:bg-amber-50/10 backdrop-blur-sm text-amber-200"
                  data-analytics="click_course_curriculum"
                >
                  {ctas.secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About the Course - Luxe Section */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-500/[0.08] blur-3xl" />
            <div className="absolute top-1/2 -left-24 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/[0.06] blur-3xl" />
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b0b0b] to-[#121212] px-8 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8 lg:px-12 lg:pb-12 lg:pt-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            {/* Soft gradient sheen */}
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(1200px_400px_at_100%_-10%,rgba(251,191,36,0.10),transparent), radial-gradient(800px_300px_at_-10%_100%,rgba(244,114,182,0.08),transparent)' }} />

            <div className="relative z-10 text-right">
              

              

              <div className="space-y-4 text-gray-100 leading-relaxed mb-8">
                <p>
                  دوره جامع ساخت AI Agentهای هوشمند با n8n از مجموعه EcomKar، شما را از یک کاربر عادی به AI Automation Architect واقعی تبدیل می‌کند.
                  در این مسیر یاد می‌گیرید چطور با ترکیب n8n، مدل‌های هوش مصنوعی، RAG، حافظه ایجنت، Cloud Computing و Prompt Engineering، سیستم‌هایی بسازید که مثل انسان فکر کنند، تصمیم بگیرند و اجرا کنند — اما بدون خستگی و بدون هزینه سنگین.
                </p>
                <p>
                  n8n در ظاهر یک ابزار ساده‌ی اتوماسیون است، اما در EcomKar یاد می‌گیرید چطور از آن ایجنت بسازید، نه فقط اتوماسیون. ما این دوره را طوری طراحی کردیم که ذهن شما را از کارمند تا خالق سیستم ارتقا دهد.
                </p>
              </div>

              <div className="mt-8 relative rounded-2xl p-6 md:p-7 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-amber-200/90">
                    🤖 چرا n8n برای شما حیاتی است؟
                  </h3>
                  <p className="text-gray-200/95 leading-relaxed mb-4">
                    در دنیای امروز، زمان = طلا نیست. زمان = داده + تصمیم + اتوماسیون است.
                    با n8n می‌توانید:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-100/95">
                    <li>پاسخ دایرکت‌ها و پیام‌های تلگرام را با هوش مصنوعی بدهید</li>
                    <li>محتوا تولید و در چند پلتفرم منتشر کنید (Instagram، YouTube، Telegram)</li>
                    <li>فرم‌ها، ثبت‌نام‌ها، CRM و فاکتورها را خودکار کنید</li>
                    <li>به مدل‌های GPT و APIهای خارجی متصل شوید</li>
                    <li>حتی برای خودتان یک AI Assistant اختصاصی بسازید که همیشه در حال کار است</li>
                  </ul>
                  <p className="text-gray-300/90 mt-2">
                    هر کاری که چند بار در روز تکرار می‌کنید، با n8n می‌تونه در چند ثانیه انجام بشه.
                  </p>
                </div>
              </div>

              <div className="mt-10 relative rounded-2xl p-6 md:p-8 lg:p-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-8 text-amber-200/90">💡 چرا این دوره یک سرمایه‌گذاری واقعی است؟</h3>

                  <div className="pt-4 md:pt-6 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">⚙️ ۱. از اتوماسیون تا ایجنتیک AI</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        در این دوره فقط workflow نمی‌سازید؛ یاد می‌گیرید چطور به n8n «درک» بدهید — با حافظه کوتاه‌مدت و بلندمدت، تصمیم‌گیری، و اجرای خودکار.
                        یاد می‌گیرید چطور از n8n یک مغز اجرایی هوشمند بسازید که به مدل‌های GPT متصل شود و بر اساس داده‌ها تصمیم بگیرد.
                      </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">🌐 ۲. سرور شخصی، استقلال کامل</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        در EcomKar به شما آموزش می‌دهیم چطور n8n، Postgres، و ربات‌های هوشمند خود را روی سرور شخصی نصب کنید (Coolify / Docker / VPS) تا
                        هیچ محدودیتی از سمت تحریم، API یا دلار نداشته باشید.
                      </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">💸 ۳. بدون هزینه دلاری، با کیفیت جهانی</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        یاد می‌گیرید چطور با پرداخت ریالی، به مدل‌های GPT-4، Gemini و Claude دسترسی داشته باشید و workflowهایی بسازید که ده‌ها برابر ارزش مالی دارند.
                      </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">⚡ ۴. از ایده تا اجرا بدون کدنویسی</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        روش آموزشی EcomKar بر اساس Vibe-Coding است — یعنی یادگیری از حس و منطق، نه از syntax.
                        شما بدون نوشتن حتی یک خط کد، سیستم‌هایی می‌سازید که قبلاً فقط تیم‌های بزرگ مهندسی می‌توانستند بسازند.
                      </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">🧠 ۵. همیشه آپدیت، همیشه زنده</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        AI هر روز تغییر می‌کند. این دوره هم با آن رشد می‌کند.
                        ما هر ماه بخش‌های جدید، پروژه‌های عملی و workflowهای واقعی را به دوره اضافه می‌کنیم.
                      </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <h4 className="text-lg font-bold mb-2 text-amber-100/90">👥 ۶. پشتیبانی و شبکه‌سازی هوشمند</h4>
                      <p className="text-gray-200/95 leading-relaxed">
                        دانشجویان وارد گروه VIP تلگرامی EcomKar می‌شوند — جایی که پروژه‌ها، ایده‌ها و موفقیت‌های خود را با بقیه متخصصان به اشتراک می‌گذارند.
                        پشتیبانی مستقیم از تیم مدرس و ارتباط با جامعه‌ی Automation-Builders ایرانی بخشی از مسیر شماست.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 relative rounded-2xl p-6 md:p-8 lg:p-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-16 text-amber-200/90">🎯 مخاطبان این دوره</h3>
                  <div className="pt-4 md:pt-6 space-y-6 text-gray-100/95">
                    <div className="space-y-2">
                      <h4 className="font-semibold">👨‍💻 توسعه‌دهندگان و مهندسان</h4>
                      <p>کسانی که می‌خواهند بدون درگیر شدن با کدهای پیچیده، سیستم‌هایی با رفتار هوشمند بسازند.</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <h4 className="font-semibold">🏢 صاحبان کسب‌وکار و مدیران IT</h4>
                      <p>افرادی که می‌خواهند فرایندهایشان را خودکار کنند و وابستگی به نیروی انسانی را کاهش دهند.</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <h4 className="font-semibold">🚀 کارآفرینان و استارتاپ‌ها</h4>
                      <p>کسانی که می‌خواهند ایده خود را سریع به محصول تبدیل کنند و با هوش مصنوعی، هزینه‌ها را به حداقل برسانند.</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <h4 className="font-semibold">📈 مارکترها و تولیدکنندگان محتوا</h4>
                      <p>مدیران شبکه‌های اجتماعی، مارکترها و تولیدکنندگان محتوایی که می‌خواهند با AI Content Flow، انتشار محتوا را ۱۰ برابر سریع‌تر کنند.</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <h4 className="font-semibold">🎓 دانشجویان و علاقه‌مندان به AI</h4>
                      <p>اگر به دنبال ورود عملی و پروژه‌محور به دنیای هوش مصنوعی هستید، این دوره دروازه‌ی ورود شماست.</p>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-2">
                      <h4 className="font-semibold">💼 مشاوران و فریلنسرها</h4>
                      <p>کسانی که می‌خواهند با ساخت ایجنت و اتوماسیون‌های شخصی‌سازی‌شده برای مشتریانشان، درآمد دلاری یا چندبرابری کسب کنند.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 relative rounded-2xl p-6 md:p-7 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-amber-200/90">🔥 این فقط یک دوره نیست، مسیر تحول شماست</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-100/95">
                    <li>اولین ایجنت هوش مصنوعی اختصاصی خود را خواهید ساخت</li>
                    <li>به سرور، Postgres، APIها و مدل‌های GPT مسلط می‌شوید</li>
                    <li>سیستم‌هایی طراحی می‌کنید که برایتان کار می‌کنند، حتی وقتی خواب هستید</li>
                  </ul>
                  <p className="text-gray-200/95 leading-relaxed mt-4">
                    اینجا جاییه که اتوماسیون تموم میشه و «هوشمندی» شروع میشه.
                    <br />
                    EcomKar — Evolution of Intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section - Luxe Custom */}
      <section id="curriculum" className="relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              سرفصل‌های دوره
            </h2>
            <p className="inline-block mx-auto text-lg text-gray-300/90 leading-relaxed">
              ساختار چهار سطحی از ذهنیت تا اجرای ایجنت‌های حرفه‌ای
            </p>
          </div>

          <div className="space-y-10">
            {/* Level 1 */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-amber-200">🎯 سطح ۱: مفاهیم پایه و درک ذهنیت AI Automation</h3>
                <p className="text-gray-300/95 mb-6">هدف: ایجاد ذهنیت عمیق از دنیای هوش مصنوعی و داده تا آماده‌سازی برای ساخت ایجنت.</p>

                <div className="overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-12 text-sm bg-white/[0.04]">
                    <div className="col-span-2 px-3 py-3 text-gray-300/90 w-[3cm] text-center">ماژول</div>
                    <div className="col-span-3 px-3 py-3 text-gray-300/90">عنوان</div>
                    <div className="col-span-7 px-3 py-3 text-gray-300/90">خروجی یادگیری</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">1</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">تاریخچه و مسیر رشد AI</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">شناخت مسیر تکامل از هوش مصنوعی کلاسیک تا Agentic AI</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">2</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">آموزش مدل‌های هوش مصنوعی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">درک مدل‌های LLM و نقش آن‌ها در اتوماسیون</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">3</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">تفاوت انواع آموزش‌ها (Supervised, Unsupervised, Reinforcement, RLHF)</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">یادگیری روش‌های تربیت مدل‌های هوشمند</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">4</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">آشنایی با JSON و Data Basics</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">شناخت ساختار داده‌ها برای ارتباط بین سیستم‌ها</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">5</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">آشنایی با API</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">یادگیری اصول اتصال سیستم‌ها و فراخوانی مدل‌ها</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-amber-200">⚙️ سطح ۲: فنی و کاربردی – تسلط بر n8n و ساخت اولین اتوماسیون</h3>
                <p className="text-gray-300/95 mb-6">هدف: تسلط کامل بر محیط n8n و ساخت گردش‌کارهای واقعی.</p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-12 text-sm bg-white/[0.04]">
                    <div className="col-span-2 px-3 py-3 text-gray-300/90 w-[3cm] text-center">ماژول</div>
                    <div className="col-span-3 px-3 py-3 text-gray-300/90">عنوان</div>
                    <div className="col-span-7 px-3 py-3 text-gray-300/90">خروجی یادگیری</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">6</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">راه‌اندازی و آشنایی با محیط n8n</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">یادگیری کار با محیط و رابط گرافیکی n8n</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">7</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">معرفی جامع Nodeها و عملکردشان</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">تسلط بر نودهای کلیدی و ساخت گردش‌کارها</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">8</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">نصب n8n و سرور ابری</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">راه‌اندازی n8n روی سرور اختصاصی (Cloud)</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">9</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">مفهوم Workflow و Nodeها</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">طراحی و اجرای سیستم‌های خودکار</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">10</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">۴ روش دیتابیس Postgres برای حافظه ایجنت</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ایجاد حافظه موقت، بلندمدت و ساخت ساختار Agent Memory</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">11</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">تعریف AI Agent و ساخت اولین اتوماسیون ساده</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت اولین ایجنت با داده واقعی برای اجرای وظایف</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">12</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ساخت گردش‌کار هوشمند با MCP | Workflow بدون کدنویسی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">«Orchestration با MCP، ساخت جریان‌های کاری چندمدلی</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-amber-200">🤖 سطح ۳: حرفه‌ای – ساخت ایجنت‌های چندکاناله و هوشمند</h3>
                <p className="text-gray-300/95 mb-6">هدف: طراحی ایجنت‌های هوشمند در بسترهای مختلف برای اتوماسیون کامل بیزنس.</p>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-12 text-sm bg-white/[0.04]">
                    <div className="col-span-2 px-3 py-3 text-gray-300/90 w-[3cm] text-center">ماژول</div>
                    <div className="col-span-3 px-3 py-3 text-gray-300/90">عنوان</div>
                    <div className="col-span-7 px-3 py-3 text-gray-300/90">خروجی یادگیری</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">13</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">آشنایی با سیستم RAG و Vector Database</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت حافظه هوشمند برای پاسخ به داده‌های اختصاصی</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">14</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">تنظیمات Google Cloud برای ابزارهای گوگل</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">اتصال به Gmail، Sheets، Docs و Drive</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">15</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت صدا به متن و متن به صدا</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت ایجنت‌های صوتی (Voice AI Agents)</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">16</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت تلفنی با خطوط اپراتوری بین‌المللی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">اجرای تماس تلفنی هوشمند با پاسخ خودکار</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">17</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت تلگرام: توسعه ربات‌های پیشرفته</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">طراحی Chatbot با تحلیل پیام، پاسخ هوشمند و APIهای خارجی</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">18</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت واتس‌اپ: ساخت چت‌بات تعاملی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت سیستم پشتیبانی و فروش خودکار در واتس‌اپ</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">19</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت اینستاگرام: اتوماسیون پست، استوری و ریلز</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت سیستم انتشار خودکار و تعامل با مخاطب</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">20</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت تحلیل کریپتو و بیت‌کوین (صفر تا صد)</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">«اتصال به API قیمت، تحلیل آموزشی </div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">21</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت تولید محتوا کانال: بازنویسی و ترجمه خودکار</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">«Pipeline تولید/بازنویسی/ترجمه با LLM</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">22</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت لینکدین: انتشار و تعامل هوشمند</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">ساخت ایجنت برای تولید محتوا و ارتباطات B2B</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">23</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت توییتر (X): مدیریت و تعامل خودکار</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">مدیریت حساب‌های X با توییت و ریتوییت هوشمند</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">24</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت یوتیوب: ساخت و انتشار ویدیوهای اتوماتیک</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">تولید و آپلود خودکار ویدیو با API یوتیوب</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">25</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت خزنده مقالات، قیمت ارز، طلا، کریپتو و...</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">جمع‌آوری و تحلیل داده‌های زنده از وب</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">26</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ایجنت RAG: ساخت حافظه برداری برای اسناد</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">اتصال مستقیم به PDF و Docs برای پرسش از منابع اختصاصی</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">27</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">ساخت نامحدود عکس و ویدیو با API</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">تولید محتوای تصویری و ویدیویی خودکار با مدل‌های GenAI</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">28</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">دسترسی نامحدود به مدل‌های هوش مصنوعی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">اتصال به GPT، Claude، Gemini، Runway و Midjourney</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 4 */}
            <div className="relative rounded-2xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 text-amber-200">💼 سطح ۴: پروژه نهایی – اجرای ایجنت واقعی برای کسب‌وکار</h3>
                <p className="text-gray-300/95 mb-6">هدف: ترکیب تمام مهارت‌ها و ساخت پروژه واقعی که مستقیماً قابل استفاده در بیزنس است.</p>

                <div className="overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-12 text-sm bg-white/[0.04]">
                    <div className="col-span-2 px-3 py-3 text-gray-300/90 w-[3cm] text-center">ماژول</div>
                    <div className="col-span-3 px-3 py-3 text-gray-300/90">عنوان</div>
                    <div className="col-span-7 px-3 py-3 text-gray-300/90">خروجی یادگیری</div>
                  </div>
                  <div className="divide-y divide-white/10">
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">26</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">طراحی پروژه واقعی برای بیزنس‌ها</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">اجرای کامل یک پروژه از ایده تا پیاده‌سازی عملی</div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">–</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">مثال‌ها</div>
                      <div className="col-span-5 px-3 py-3 text-gray-300/95 space-y-1">
                        <div>- ایجنت پشتیبانی مشتری برای سایت فروشگاهی</div>
                        <div>- ایجنت اتوماسیون تولید محتوا برای اینستاگرام</div>
                        <div>- ایجنت تحلیل‌گر داده‌های مالی</div>
                        <div>- ایجنت مدیریت سفارش‌ها و مشتریان</div>
                        <div>- ساخت ربات تحقیق بازار Reddit + گزارش هفتگی هوشمند</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 text-sm">
                      <div className="col-span-2 px-3 py-3 text-gray-100 w-[3cm] text-center">–</div>
                      <div className="col-span-3 px-3 py-3 text-gray-100">تحویل نهایی</div>
                      <div className="col-span-7 px-3 py-3 text-gray-300/95">دانشجو پروژه واقعی خود را اجرا، تست و به بیزنس واقعی متصل می‌کند.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl p-5 bg-emerald-900/15 border border-emerald-700/30">
                  <h4 className="font-bold text-emerald-300 mb-2">🔥 در پایان این دوره، شرکت‌کننده‌ها می‌تونن:</h4>
                  <ul className="list-disc list-inside text-gray-100/95 space-y-1">
                    <li>ایجنت اختصاصی برای هر بیزنس طراحی و بفروشن</li>
                    <li>سرویس AI Automation شخصی بسازن</li>
                    <li>از اتوماسیون برای ساخت درآمد غیرفعال استفاده کنن</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              قیمت‌گذاری و ثبت‌نام
            </h2>
            <p className="text-lg text-gray-300/90 max-w-2xl mx-auto text-center">
              سرمایه‌گذاری یک‌باره برای مهارت‌های آینده
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl p-8 text-center bg-gradient-to-br from-[#0b0b0b] to-[#121212] border border-amber-400/20 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.10),transparent_45%)]" />
            <h3 className="relative z-10 text-2xl font-bold mb-2 text-amber-200">
              {pricing.label}
            </h3>
            <div className="relative z-10 text-4xl font-extrabold text-amber-300 mb-4">
              {pricing.value}
            </div>
            {pricing.note && (
              <p className="relative z-10 text-sm text-gray-400 mb-4">
                {pricing.note}
              </p>
            )}
            {pricing.guarantee && (
              <div className="relative z-10 mb-6 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-xl">
                <span className="text-sm font-medium text-emerald-300">
                  {pricing.guarantee}
                </span>
              </div>
            )}
            
            <a
              href="/checkout"
              className="relative z-10 w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5"
              data-analytics="click_course_enroll"
            >
              ثبت‌نام در دوره
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="relative py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12 flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                سوالات متداول
              </h2>
              <p className="text-lg text-gray-300/90 max-w-2xl mx-auto text-center">
                پاسخ سوالات رایج درباره دوره و نحوه ثبت‌نام
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 hover:bg-white/[0.07] transition-colors duration-200 backdrop-blur-md border border-white/10 hover:border-amber-400/30 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-amber-200 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-300/90 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}