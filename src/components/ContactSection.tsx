import React, { useState } from 'react';
import { Language } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'tous-web-php',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang })
      });
      const data = await res.json();
      if (data.success) {
        setStatus({
          success: true,
          message: isFa ? 'پیام شما ثبت شد. کارشناسان فیدار سازه بندار به زودی با شما ارتباط خواهند گرفت.' : 'Your message has been received! Our engineering team will get back to you.'
        });
        setFormData({ name: '', email: '', phone: '', service: 'tous-web-php', message: '' });
      } else {
        setStatus({
          success: false,
          message: data.error || (isFa ? 'خطا در ثبت پیام' : 'Error submitting message')
        });
      }
    } catch {
      setStatus({
        success: false,
        message: isFa ? 'خطای شبکه' : 'Network error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-3">
            {isFa ? 'ارتباط با کارشناسان فیدار سازه بندار' : 'Get In Touch'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {isFa ? 'با مشاوران و متخصصان ما در ارتباط باشید' : 'Request Consultation & Technical Audit'}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isFa 
              ? 'برای ما پیام بگذارید تا مشاوران ما در اطرع وقت با شما تماس بگیرند'
              : 'Our engineering specialists are ready to analyze your web requirements and deliver customized solutions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details (Left/Right) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isFa ? 'اطلاعات تماس گروه فیدار سازه بندار:' : 'Biesss Digital Contact Details:'}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-100 text-primary border border-slate-200 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{isFa ? 'ایمیل پشتیبانی:' : 'Support Email:'}</span>
                    <a href="mailto:info@fidarbondar.com" className="text-sm font-semibold text-primary text-black font-mono">
                      info@fidarbondar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-100 text-primary border border-slate-200 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{isFa ? 'تلفن مشاوره مستقیم:' : 'Direct Phone Line:'}</span>
                    <a href="tel:02166129310" className="text-sm font-semibold text-slate-900 hover:text-blue-800 font-mono">
                      02166129310
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-100 text-primary border border-slate-200 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">{isFa ? 'دفتر مرکزی:' : 'HQ Address:'}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {isFa ? 'تهران، خیابان اسکندری، پلاک 432 ساختمان پردیس' : 'No. 432, Pardis Building, Eskandari Street, Tehran, Iran'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-primary block">{isFa ? 'تضمین کیفیت کدهای PHP:' : 'Quality & Security Guarantee:'}</span>
              <p>
                {isFa ? 'تمامی سورس‌کدهای PHP ارائه شده دارای مستندات کامل، کئوری‌های ایمن PDO و سازگاری ۱۰۰٪ با موتورهای جستجوی گوگل هستند.' : 'All generated PHP scripts include full documentation, PDO parameterization, and search engine compliance.'}
              </p>
            </div> */}

          </div>

          {/* Form (Right/Left) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-5">
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>{isFa ? 'فرم ارسال پیام مستند:' : 'Send Your Direct Message:'}</span>
              </h3>

              {status && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-2 ${
                  status.success ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-red-50 text-red-900 border border-red-200'
                }`}>
                  {status.success ? <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-600" /> : <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />}
                  <span>{status.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {isFa ? 'نام شما *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                    placeholder={isFa ? 'علی رضایی' : 'John Smith'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {isFa ? 'آدرس ایمیل *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {isFa ? 'شماره موبایل' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                    placeholder="0912..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    {isFa ? 'خدمت مورد نظر' : 'Requested Subject'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="tous-web-php">{isFa ? 'توسعه وب‌سایت PHP و دیتابیس MySQL' : 'PHP & MySQL Custom Web Dev'}</option>
                    <option value="seo-audit">{isFa ? 'سئوی پیشرفته و آنالیز گوگل' : 'Technical SEO Audit & Growth'}</option>
                    <option value="bilingual-system">{isFa ? 'سیستم دو زبانه (فارسی / انگلیسی)' : 'Bilingual RTL/LTR Architecture'}</option>
                    <option value="custom-cms">{isFa ? 'پنل مدیریت اختصاصی CMS' : 'Custom Admin CMS'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  {isFa ? 'متن پیام شما *' : 'Your Message *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
                  placeholder={isFa ? 'شرح خلاصه‌ای از پروژه و زمان تحویل مد نظر...' : 'Describe your project scope...'}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isFa ? 'در حال ارسال...' : 'Sending...') : (isFa ? 'ارسال درخواست مشاوره' : 'Send Message')}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
