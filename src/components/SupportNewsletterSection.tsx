import React, { useState } from 'react';
import { Language } from '../types';
import { Mail, HelpCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface SupportNewsletterSectionProps {
  lang: Language;
}

export const SupportNewsletterSection: React.FC<SupportNewsletterSectionProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <section className="relative w-full bg-black text-white py-16 sm:py-24 px-6 sm:px-12 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Column 1: Stay Up To Date (Newsletter) */}
        <div className="space-y-6 flex flex-col justify-between p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-medium text-white">
              {isFa ? 'به‌روز بمانید' : 'Stay up to date'}
            </h3>

            <div className="h-0.5 w-full bg-gray-600" />

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {isFa ? (
                'محصولات جدید، رویدادها، اخبار دیتابیس و برنامه‌نویسی PHP: در خبرنامه رسمی بیئس عضو شوید و از جدیدترین تحولات مطلع گردید.'
              ) : (
                'New products, events, news: Subscribe to our newsletter and stay up to date with news from the world of Biesse.'
              )}
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-teal-900/50 border border-teal-500 text-teal-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <span>{isFa ? 'عضویت شما در خبرنامه بیئس با موفقیت ثبت شد.' : 'Subscribed successfully! Thank you.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isFa ? 'ایمیل خود را وارد کنید...' : 'Enter your email...'}
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#006063]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-white text-[#006063] hover:bg-[#006063] hover:text-white font-bold text-xs sm:text-sm transition shadow-md hover:rounded-[30px]"
              >
                {isFa ? 'عضویت' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        {/* Column 2: Need Help? (Support Request) */}
        <div className="space-y-6 flex flex-col justify-between p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-medium text-white">
              {isFa ? 'نیاز به پشتیبانی دارید؟' : 'Need help?'}
            </h3>

            <div className="h-0.5 w-full bg-[#006063]" />

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              {isFa ? (
                'ما خدمات پس از فروش، تأمین قطعات یدکی و پشتیبانی کدهای PHP/MySQL را به منظور ارتقای کارایی و بهره‌وری دستگاه‌ها و وب‌سایت‌های شما ارائه می‌دهیم.'
              ) : (
                'We provide after-sales service and spare parts with a view to supporting the efficiency and productivity of installed machinery.'
              )}
            </p>
          </div>

          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-lg bg-[#006063] hover:bg-white hover:text-[#006063] text-white font-bold text-xs sm:text-sm transition shadow-md hover:rounded-[30px]"
            >
              <span>{isFa ? 'درخواست پشتیبانی و مشاوره' : 'Request support'}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
