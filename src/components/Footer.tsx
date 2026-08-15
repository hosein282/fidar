import React from 'react';
import { Language } from '../types';
import Image from 'next/image';

import { Facebook, Instagram, Linkedin, Youtube, Shield, FileText } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenAdmin: () => void;
  onOpenExporter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenAdmin, onOpenExporter }) => {
  const isFa = lang === 'fa';

  return (
    <footer className="bg-black text-white pt-12 pb-16 px-6 sm:px-12 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
        {/* Top Header Row with Logo & Socials */}
        <div className="flex flex-col lg:flex-row items-center lg:items-baseline justify-between gap-8 pb-8 border-b border-gray-800">
          
          {/* Fidar Bondar SVG Logo */}
          <a href="#" className="shrink-0">
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 219 65" className="h-10 text-white">
              <path fill="currentColor" d="m56.966 37.417-19.879-19.85c-.878-.876-1.76-1.758-3.518-1.758H15.971a1.764 1.764 0 0 1-1.76-1.758V1.759C14.21.793 13.42 0 12.448 0H.148s-.01 0-.01.009v1.75c0 1.732.875 2.63 1.762 3.512l21.111 21.08c.879.878 1.762 1.76 3.518 1.76h17.594c.967 0 1.761.788 1.761 1.758v21.08c0 .966-.79 1.759-1.761 1.759l-33.932-.009c-1.118 0-1.677 1.347-.887 2.135L19.484 65H33.56c1.735 0 2.64-.882 3.518-1.759l19.879-19.849a4.233 4.233 0 0 0 0-5.975h.009Z"></path>
              <path fill="currentColor" d="M124.546 25.674c-8.021 0-12.714 5.373-12.714 13.803 0 8.429 4.698 13.749 12.714 13.749 6.015 0 10.66-3.11 11.924-7.956.053-.212-.16-.42-.367-.42h-4.539c-.213 0-.315.159-.422.367-1.215 2.583-2.9 3.898-6.596 3.898-5.013 0-7.439-3.264-7.439-7.743 0-.106.106-.261.261-.261h19.577a.36.36 0 0 0 .368-.368v-1.262c0-8.009-4.431-13.803-12.767-13.803v-.004Zm6.965 11.694h-14.036a.359.359 0 0 1-.368-.368c.053-3.69 2.005-7.269 7.386-7.269s7.333 3.584 7.386 7.27a.358.358 0 0 1-.368.367ZM154.304 37.373l-4.378-.687c-2.586-.42-4.17-1.262-4.17-3.264 0-2.109 1.478-3.792 5.701-3.792 4.747 0 6.543 2.263 6.543 4.638 0 .212.159.367.368.367h4.272a.36.36 0 0 0 .369-.367c0-5.64-5.067-8.59-11.557-8.59-4.645 0-10.708 2.215-10.708 7.744 0 4.319 2.794 6.48 6.964 7.114l6.122.948c3.114.474 5.013 1.315 5.013 3.69 0 2.635-2.165 4.004-6.65 4.004-4.747 0-6.912-2.423-6.912-4.532a.358.358 0 0 0-.368-.367h-4.272a.36.36 0 0 0-.368.367c0 4.846 4.326 8.59 11.924 8.59 6.65 0 11.504-2.53 11.504-8.43s-4.698-6.693-9.392-7.429l-.005-.004ZM180.738 37.373l-4.379-.687c-2.585-.42-4.169-1.262-4.169-3.264 0-2.109 1.477-3.792 5.7-3.792 4.747 0 6.544 2.263 6.544 4.638 0 .212.159.367.367.367h4.272c.214 0 .369-.159.369-.367 0-5.64-5.066-8.59-11.557-8.59-4.644 0-10.708 2.215-10.708 7.744 0 4.319 2.794 6.48 6.964 7.114l6.123.948c3.114.474 5.012 1.315 5.012 3.69 0 2.635-2.165 4.004-6.649 4.004-4.747 0-6.912-2.423-6.912-4.532a.359.359 0 0 0-.368-.367h-4.272a.36.36 0 0 0-.368.367c0 4.846 4.325 8.59 11.923 8.59 6.651 0 11.504-2.53 11.504-8.43s-4.697-6.693-9.392-7.429l-.004-.004ZM93.097 33.682c-.314-.159-.314-.42 0-.58 3.377-1.528 4.854-4.372 4.854-7.428-.053-4.74-2.902-9.852-10.816-9.852h-16.25a.359.359 0 0 0-.367.368V52.33c0 .213.16.368.368.368h16.622c7.706 0 11.237-5.059 11.237-10.011 0-3.637-1.163-7.061-5.648-9.01v.005ZM75.474 20.194c0-.212.16-.367.368-.367h10.34c4.747 0 6.752 2.476 6.752 6.427 0 3.951-2.266 5.373-6.223 5.373H75.84a.359.359 0 0 1-.368-.368V20.194ZM86.71 48.593H75.788a.359.359 0 0 1-.368-.368v-12.12c0-.212.16-.367.368-.367h11.29c4.485 0 6.703 2.316 6.703 6.533 0 4.217-2.848 6.322-7.071 6.322ZM107.928 15.822h-4.964a.367.367 0 0 0-.368.368v5.271c0 .203.164.368.368.368h4.964a.368.368 0 0 0 .368-.368V16.19a.368.368 0 0 0-.368-.368ZM107.607 26.201h-4.276a.368.368 0 0 0-.368.368v25.767c0 .203.165.367.368.367h4.276a.368.368 0 0 0 .369-.367V26.569a.368.368 0 0 0-.369-.368ZM205.697 25.674c-8.02 0-12.715 5.373-12.715 13.803 0 8.429 4.698 13.749 12.715 13.749 6.015 0 10.66-3.11 11.924-7.956.053-.212-.16-.42-.369-.42h-4.537c-.213 0-.316.159-.422.367-1.215 2.583-2.902 3.898-6.596 3.898-5.013 0-7.439-3.264-7.439-7.743 0-.106.106-.261.261-.261h19.577a.36.36 0 0 0 .368-.368v-1.262c0-8.009-4.432-13.803-12.767-13.803v-.004Zm6.965 11.694h-14.037a.358.358 0 0 1-.367-.368c.053-3.69 2.004-7.269 7.386-7.269 5.381 0 7.332 3.584 7.386 7.27 0 .212-.16.367-.368.367Z"></path>
            </svg> */}
             <Image
                          src="/assets/images/logo.png"
                          width={140}
                          height={60}
                          alt="Fidar Bondar Sazeh فیدار بندار سازه"
                        />
          </a>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/Fidar BondarHQ/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/Fidar Bondar/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/Fidar Bondar" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/channel/UClGlpjMxN5E4L8eU81Vu7rg" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Quick Nav Links Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400">
          <div>
            <h4 className="text-white font-bold text-sm mb-3">{isFa ? 'دستگاه‌ها و کدهای PHP' : 'Machines & Code'}</h4>
            <ul className="space-y-2">
              <li><a href="#materials" className="hover:text-white transition">{isFa ? 'خطوط تولید چوب (Wood)' : 'Wood Processing'}</a></li>
              <li><a href="#materials" className="hover:text-white transition">{isFa ? 'دستگاه‌های شیشه (Glass)' : 'Glass Processing'}</a></li>
              <li><a href="#materials" className="hover:text-white transition">{isFa ? 'تجهیزات سنگ (Stone)' : 'Stone Processing'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">{isFa ? 'دیتابیس و سئو' : 'Database & SEO'}</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenExporter} className="hover:text-white transition text-left">{isFa ? 'خروجی سورس MySQL PDO' : 'MySQL PDO Export'}</button></li>
              <li><a href="#seo-suite" className="hover:text-white transition">{isFa ? 'ابزارهای سئوی گوگل' : 'SEO Suite'}</a></li>
              <li><a href="#blog" className="hover:text-white transition">{isFa ? 'مقالات و اخبار دیتابیس' : 'Articles & News'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">{isFa ? 'مدیریت و پشتیبانی' : 'CMS & Support'}</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenAdmin} className="hover:text-white transition text-left">{isFa ? 'پنل مدیریت محتوای CMS' : 'CMS Admin Dashboard'}</button></li>
              <li><a href="#contact" className="hover:text-white transition">{isFa ? 'درخواست پشتیبانی فنی' : 'Technical Support'}</a></li>
              <li><a href="#locations" className="hover:text-white transition">{isFa ? 'شعب و نمایندگی‌ها' : 'Global Locations'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">{isFa ? 'درباره گروه فیدار بندار' : 'About Fidar Bondar'}</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {isFa ? (
                'فیدار بندار یک شرکت بین‌المللی پیشرو در تولید خطوط و دستگاه‌های صنعتی، دیتابیس‌های قدرتمند و پلتفرم‌های دیجیتال است.'
              ) : (
                'Fidar Bondar is an international company producing lines, machines and components for transforming materials into products.'
              )}
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 pt-6 border-t border-gray-800">
          <div>
            Copyright Fidar Bondar | CF e P.IVA IT 00113220412 Reg. Imp. Pesaro Urbino Nr. 1682 | Cap. Soc. € 27.402.593 i.v
          </div>

          <div className="flex flex-wrap gap-4 text-slate-400">
            <a href="#" className="hover:text-white">Privacy center</a>
            <a href="#" className="hover:text-white">Privacy and cookie policy</a>
            <a href="#" className="hover:text-white">List of cookies</a>
            <a href="#" className="hover:text-white">Whistleblowing</a>
            <a href="#" className="hover:text-white">Data Act</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
