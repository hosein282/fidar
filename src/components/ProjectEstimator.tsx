import React, { useState } from 'react';
import { Language, EstimatorFeature } from '../types';
import { ESTIMATOR_FEATURES } from '../data/mockData';
import { Calculator, CheckCircle2, ShieldCheck, Zap, Send, Check, AlertCircle } from 'lucide-react';

interface ProjectEstimatorProps {
  lang: Language;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ lang }) => {
  const isFa = lang === 'fa';
  
  // Selected features state
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'bilingual_core',
    'php_mysql_db',
    'seo_suite_pro',
    'biesss_dark_theme'
  ]);

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const toggleFeature = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const totalPriceUSD = selectedIds.reduce((acc, id) => {
    const feat = ESTIMATOR_FEATURES.find(f => f.id === id);
    return acc + (feat ? feat.priceUSD : 0);
  }, 300); // Base package rate

  const estimatedDays = Math.max(5, Math.ceil(selectedIds.length * 2.5));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const selectedFeatureNames = selectedIds.map(id => {
      const f = ESTIMATOR_FEATURES.find(item => item.id === id);
      return f ? (isFa ? f.name.fa : f.name.en) : id;
    }).join(' + ');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: `Estimator Quote: $${totalPriceUSD}`,
          budget: `$${totalPriceUSD} (${estimatedDays} days)`,
          message: `Estimated Features: ${selectedFeatureNames}\n\nClient Notes: ${formData.message}`,
          lang
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: isFa ? 'استعلام قیمت شما با موفقیت ثبت شد. کارشناسان بیس به‌زودی با شما تماس می‌گیرند.' : 'Quote inquiry submitted successfully! Our engineering team will contact you shortly.'
        });
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || (isFa ? 'خطا در ارسال پیام.' : 'Submission error.')
        });
      }
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: isFa ? 'خطا در ارتباط با سرور.' : 'Server communication error.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="py-20 bg-white text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 block">
            {isFa ? 'سیستم محاسبه هوشمند هزینه' : 'Interactive Quote Engine'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {isFa ? 'محاسبه آنلاین قیمت و زمان ساخت وب‌سایت' : 'Estimate Project Budget & Delivery Timeline'}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            {isFa 
              ? 'ویژگی‌های مورد نیاز وب‌سایت خود را انتخاب کنید تا زمان و هزینه دقیق پروژه به صورت آنی محاسبه شود.'
              : 'Customize your requested features to calculate instant estimated project scope, timeline, and pricing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Feature Selection Cards (Left/Right) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span>{isFa ? 'انتخاب ویژگی‌های فنی پروژه:' : 'Select Technical Requirements:'}</span>
            </h3>

            <div className="space-y-3">
              {ESTIMATOR_FEATURES.map((feat) => {
                const isSelected = selectedIds.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected 
                          ? 'bg-blue-900 border-blue-900 text-white' 
                          : 'bg-white border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-bold text-slate-900">
                            {isFa ? feat.name.fa : feat.name.en}
                          </span>
                          {feat.recommended && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800 border border-blue-200">
                              {isFa ? 'پیشنهاد اصلی' : 'Recommended'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 block mt-1">
                          {isFa ? `دسته‌بندی: ${feat.category}` : `Category: ${feat.category}`}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-blue-900 font-mono">
                        +${feat.priceUSD}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary & Inquiry Form (Right/Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Summary Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md space-y-6 relative overflow-hidden">

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-sm text-slate-400 font-medium">
                  {isFa ? 'ویژگی‌های انتخاب شده' : 'Selected Scope'}
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {selectedIds.length} {isFa ? 'مورد' : 'Items'}
                </span>
              </div>

              {/* Total Calculation */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-medium">
                  {isFa ? 'برآورد هزینه تخمینی' : 'Total Estimated Budget'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    ${totalPriceUSD}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {isFa ? '(معادل ارزی پروژه)' : 'USD base'}
                  </span>
                </div>
              </div>

              {/* Timeline Calculation */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800 text-xs sm:text-sm text-slate-200 border border-slate-700">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    {isFa ? `زمان تحویل تخمینی: ${estimatedDays} روز کاری` : `Estimated Timeline: ${estimatedDays} Work Days`}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {isFa ? 'شامل فاز کدنویسی PHP، سئو و دیتابیس MySQL' : 'Includes PHP backend, MySQL DB & SEO setup'}
                  </span>
                </div>
              </div>

            </div>

            {/* Direct Inquiry Form */}
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 mb-2">
                {isFa ? 'ارسال درخواست مشاوره و استعلام:' : 'Submit Your Project Inquiry:'}
              </h4>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-2 ${
                  submitStatus.success 
                    ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}>
                  {submitStatus.success ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isFa ? 'نام و نام خانوادگی *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder={isFa ? 'مثال: علی محمدی' : 'John Doe'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isFa ? 'ایمیل کاری *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isFa ? 'شماره تماس' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="0912..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isFa ? 'نام شرکت / مجموعه' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder={isFa ? 'شرکت شما' : 'Company Inc'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isFa ? 'توضیحات تکمیلی پروژه' : 'Project Description'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder={isFa ? 'خلاصه از نیازمندی‌های اختصاصی پروژه...' : 'Briefly describe your requirements...'}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? (isFa ? 'در حال ثبت...' : 'Submitting...') : (isFa ? 'ثبت درخواست استعلام قیمت' : 'Submit Consultation Request')}</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
