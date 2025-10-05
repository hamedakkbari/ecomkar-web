'use client';

import { useState } from 'react';


export default function ConsultationPageClient() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [subject, setSubject] = useState('');
  const [talkPoints, setTalkPoints] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [file1, setFile1] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API if needed
    alert('درخواست شما ثبت شد.');
  };

  const formatJalali = (iso: string) => {
    try {
      if (!iso) return '';
      const d = new Date(iso);
      // Use Persian calendar via Intl
      const fmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: iso.includes('T') ? '2-digit' : undefined,
        minute: iso.includes('T') ? '2-digit' : undefined,
      });
      return fmt.format(d);
    } catch {
      return '';
    }
  };

  return (
    <div dir="rtl" data-analytics="view_page_consultation" className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        <h1 
          className="text-3xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          فرم درخواست مشاوره
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          لطفاً اطلاعات خود را به دقت وارد کنید
        </p>
      </header>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div
          className="backdrop-blur-md rounded-2xl p-8 card"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}
        >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      نام و نام خانوادگی <span className="text-red-400 mr-1">*</span>
                    </label>
                    <input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="نام و نام خانوادگی خود را بنویسید" className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      شماره تماس <span className="text-red-400 mr-1">*</span>
                    </label>
                    <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="اگر شماره خارج ایران است با کد کشور بنویسید" className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      ایمیل <span className="text-red-400 mr-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>@</span>
                      <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com" className="w-full pl-8 pr-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>آیدی تلگرام</label>
                    <input value={telegram} onChange={e=>setTelegram(e.target.value)} placeholder="@username" className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>انتخاب تاریخ و زمان</label>
                    <input type="datetime-local" value={dateTime} onChange={e=>setDateTime(e.target.value)} className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                    {dateTime && (
                      <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                        تاریخ شمسی: {formatJalali(dateTime)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      تاریخ پرداخت <span className="text-red-400 mr-1">*</span>
                    </label>
                    <input required type="date" value={paymentDate} onChange={e=>setPaymentDate(e.target.value)} className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                    {paymentDate && (
                      <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                        تاریخ شمسی: {formatJalali(paymentDate)}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      موضوع جلسه <span className="text-red-400 mr-1">*</span>
                    </label>
                    <input required value={subject} onChange={e=>setSubject(e.target.value)} placeholder="موضوع جلسه مشاوره خود را بنویسید" className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      موارد قابل بحث در جلسه <span className="text-red-400 mr-1">*</span>
                    </label>
                    <textarea required value={talkPoints} onChange={e=>setTalkPoints(e.target.value)} placeholder="مواردی که قرار است در جلسه مشاوره صحبت شود را بنویسید" rows={5} className="w-full px-4 py-3 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
        </div>

        {/* Upload: Payment Receipt */}
        <div
          className="backdrop-blur-md rounded-2xl p-6 card"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}
        >
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    آپلود رسید پرداخت <span className="text-red-400 mr-1">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <input required type="file" accept="image/*,application/pdf" className="hidden" onChange={e=>setFile1(e.target.files?.[0] ?? null)} />
                    <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                      <div className="mb-1">انتخاب فایل برای کلیک</div>
                      <div className="mt-1" style={{ color: 'var(--text-muted)' }}>حداکثر سایز: ۵ مگابایت • فرمت: تصویر یا PDF</div>
                    </div>
                  </label>
                </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-6 py-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-3 focus-visible:outline-none btn-primary"
        >
          ارسال درخواست مشاوره
        </button>
      </form>

      {/* Payment Info */}
      <div className="mt-6">
        <div
          className="backdrop-blur-md rounded-2xl p-6 card"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>اطلاعات پرداخت</h3>
          <div className="space-y-4 text-sm">
                  <div>
                    <div className="mb-1" style={{ color: 'var(--text-secondary)' }}>اطلاعات کارت</div>
                    <div className="px-3 py-2 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }}>6104-3389-1762-4187</div>
                  </div>
                  <div>
                    <div className="mb-1" style={{ color: 'var(--text-secondary)' }}>صاحب حساب</div>
                    <div className="px-3 py-2 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }}>حامد اکبری</div>
                  </div>
                  <div>
                    <div className="mb-1" style={{ color: 'var(--text-secondary)' }}>بانک</div>
                    <div className="px-3 py-2 border rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--text-primary)' }}>ملت</div>
                  </div>
                  <div>
                    <div className="mb-1" style={{ color: 'var(--text-secondary)' }}>مبلغ</div>
                    <div className="px-3 py-2 border rounded-lg font-bold" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-control)', color: 'var(--primary-neon)' }}>3.000.000 تومان</div>
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
}


