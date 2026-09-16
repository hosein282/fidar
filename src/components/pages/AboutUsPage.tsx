'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Language, SEOMetaConfig } from '../../types';
import { Header } from '../Header';
import { ContactSection } from '../ContactSection';
import { Footer } from '../Footer';
import {
  Ship, Anchor, Wind, Fan, Wrench, RefreshCw, Languages, SearchCheck,
  ChevronDown, MapPin, Compass, CalendarDays, Phone,
} from 'lucide-react';


interface AboutUsPageProps {
  seoConfig: SEOMetaConfig;
  onOpenAdmin?: () => void;
  onOpenExporter?: () => void;
  lang?: Language;
}

// =========================================================
// All specifications of the Fidar Bondar project (bilingual)
// =========================================================
const slides = [
  {
    icon: Ship,
    color: 'bg-primary-dark',
    image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg",
    title: { fa: 'ترانستینر هیبرید RTG', en: 'Hybrid RTG Cranes' },
    desc: {
      fa: 'جرثقیل‌های کانتینری هیبرید نسل جدید برای بهینه‌سازی عملیات ترمینال‌های بندری',
      en: 'Next-generation hybrid container cranes engineered to optimize port terminal operations.',
    },
  },
  {
    icon: Anchor,
    color: 'bg-primary',
    image: "/assets/images/slides/Vetro_A_0_bassa.webp",
    title: { fa: 'تجهیزات جانبی بندرگاهی', en: 'Port Auxiliary Equipment' },
    desc: {
      fa: 'تجهیزات مکمل و جانبی بندر برای تسریع گردش کار در پایانه‌ها',
      en: 'Complementary terminal equipment that accelerates workflow inside ports and yards.',
    },
  },
  {
    icon: Wind,
    color: 'bg-primary-dark',
    image: "/assets/images/slides/legno_forma_A.RGB_color.0000_bassa.webp",
    title: { fa: 'فن‌های صنعتی', en: 'Industrial Fans' },
    desc: {
      fa: 'فن‌های پرقدرت تهویه و انتقال هوا برای صنایع سنگین و محیط‌های صنعتی',

      en: 'High-capacity ventilation & air-moving fans for heavy industry environments.',
    },
  },
  {
    icon: Fan,
    color: 'bg-primary',
    image: "/assets/images/slides/Pietra_designB0-rossoverona.webp",
    title: { fa: 'بلوئر صنعتی', en: 'Industrial Blowers' },
    desc: {
      fa: 'دمنده‌های صنعتی اختصاصی با راندمان بالا جهت فرآیندهای انتقال مواد',
      en: 'Custom high-efficiency industrial blowers for material handling processes.',
    },
  },
  {
    icon: Wrench,
    color: 'bg-primary-dark',
    image: "/assets/images/slides/polimeri_formaA_02-viola-lr.webp",
    title: { fa: 'تعمیرات تخصصی شناورها', en: 'Specialized Vessel Repair' },
    desc: {
      fa: 'تعمیر، بازسازی و نوسازی تخصصی شناورها و سازه‌های دریایی',
      en: 'Expert repair, refurbishment and renewal of vessels and marine structures.',
    },
  },
  {
    icon: RefreshCw,
    color: 'bg-primary',
    image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg",
    title: { fa: 'بازسازی و به‌روزرسانی تجهیزات', en: 'Equipment Retrofit & Upgrade' },
    desc: {
      fa: 'به‌روزرسانی الکتریکال و مکانیکال انواع تجهیزات بندری و صنعتی',
      en: 'Electrical & mechanical upgrades for port and industrial equipment fleets.',
    },
  }

];

const ACCORDIONS = [
  {
    icon: Compass,
    title: { fa: 'شوروم و معرفی تجهیزات', en: 'Showroom & Equipment Demo' },
    content: {
      fa: 'از نزدیک با نسل جدید تجهیزات انتقال مواد، ترانستینرهای هیبرید و بلوئرهای صنعتی ما آشنا شوید. بازدید حضوری و دموی زنده در محل پروژه‌ها با هماهنگی قبلی میسر است.',
      en: 'Explore our next-generation material handling systems, hybrid RTG cranes and industrial blowers up close. Live demos at project sites are available by appointment.',
    },
    action: {
      fa: 'یافتن نزدیک‌ترین شعبه یا نمایندگی',
      en: 'Find your nearest official branch or distributor',
    },
  },
  {
    icon: CalendarDays,
    title: { fa: 'رویدادهای پیش رو', en: 'Upcoming Events' },
    content: {
      fa: 'گروه فیدار سازه بندار در نمایشگاه‌های بین‌المللی صنعت دریایی، بنادر و تجهیزات صنعتی حضور فعال دارد. آخرین رویدادها و همایش‌های تخصصی از طریق پایگاه خبری اطلاع‌رسانی می‌شود.',
      en: 'Fidar Sazeh Bandar actively participates in international maritime, port machinery and industrial equipment exhibitions. Stay tuned through our news hub for upcoming events.',
    },
    action: {
      fa: 'مشاهده اخبار و رویدادها',
      en: 'Browse news & events',
    },
  },
  {
    icon: MapPin,
    title: { fa: 'پروژه‌های اجرا شده', en: 'Delivered Projects' },
    content: {
      fa: 'تعمیرات تخصصی شناورها، بازسازی الکتریکال و مکانیکال تجهیزات بندری و ارتقای پایانه‌ها؛ نمونه‌کارهای اجرا شده در بخش نمونه‌کارها و اخبار قابل مشاهده است.',
      en: 'From specialized vessel repair to electrical & mechanical retrofit of port equipment and terminal upgrades — delivered projects are showcased in the portfolio and news sections.',
    },
    action: {
      fa: 'مشاهده نمونه‌کارها',
      en: 'View portfolio',
    },
  },
  {
    icon: Phone,
    title: { fa: 'تماس با ما', en: 'Contacts' },
    content: {
      fa: 'دفتر مرکزی: تهران، خیابان اسکندری، پلاک ۴۳۲، ساختمان پردیس — تلفن: ۰۲۱-۶۶۱۲۹۳۱۰',
      en: 'Headquarters: No. 432, Pardis Building, Eskandari St., Tehran — Phone: +98 21 6612 9310',
    },
    action: {
      fa: 'ثبت درخواست مشاوره',
      en: 'Request a consultation',
    },
  },
];

const VALUES_FA = [
  'دقت مهندسی در تمام مراحل طراحی و ساخت',
  'کیفیت پایدار و استانداردهای بین‌المللی',
  'نوآوری و طراحی آینده‌گرا',
  'تجربه اجرایی در پروژه‌های واقعی',
  'تعهد به پایداری و بهره‌وری',
];
const VALUES_EN = [
  'Engineering precision across every design stage',
  'Consistent quality and international standards',
  'Innovation with future-oriented design',
  'Field-proven execution experience',
  'Commitment to sustainability & efficiency',
];


// const slides = [{ title: "Widespread transparency", description: "The honesty of the people, the integrity of the company", image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg", },
// { title: "Building trust", description: "Transparency creates stronger relationships and lasting trust", image: "/assets/images/test-GLASS-icon-2.png", },
// { title: "Integrity in action", description: "Every decision is driven by honesty, responsibility and integrity", image: "https://images.ctfassets.net/bdj0rlksezwc/46Qovx76Xp99zEZk9uh2CR/3ba0f915f8f10f7013a6a7f6b64505c3/istockphoto-1338523355-1024x1024.jpg", },];

const AboutUsPageComponent: React.FC<AboutUsPageProps> = ({
  seoConfig,
  onOpenAdmin = () => { },
  onOpenExporter = () => { },
  lang = 'fa',
}) => {
  const router = useRouter();

  const currentLang: Language = (lang === 'en' || lang === 'fa') ? lang : 'fa';
  const isFa = currentLang === 'fa';
  const values = isFa ? VALUES_FA : VALUES_EN;

  const [activeModal, setActiveModal] = useState<'admin' | 'exporter' | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [active, setActive] = useState(0);

  // Sync HTML lang and dir attribute + scroll to top on load
  useEffect(() => {
    document.documentElement.setAttribute('dir', isFa ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);

  }, [currentLang, isFa]);


  const handleLanguageSwitch = (newLang: Language) => {
    router.push(`/${newLang}/about`);
  };

  const handleOpenAdmin = () => {
    setActiveModal('admin');
    onOpenAdmin?.();
  };

  const handleOpenExporter = () => {
    setActiveModal('exporter');
    onOpenExporter?.();
  };

  return (
    <div className="min-h-screen bg-surface text-slate-900 font-sans selection:bg-primary selection:text-white">

      {/* Sticky Fidar Bondar Header */}
      <Header
        lang={currentLang}
        onLanguageChange={handleLanguageSwitch}
        onOpenAdmin={handleOpenAdmin}
        onOpenExporter={handleOpenExporter}
        seoConfig={seoConfig}
      />

      <main className='scroll-smooth '>


        {/* 1. Page Hero — full-screen banner + breadcrumb */}
        {/* <section className="relative w-full min-h-[62vh] lg:min-h-[72vh] bg-primary-dark text-white overflow-hidden flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: 'url("/assets/images/scroll-bg.webp")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l  from-primary-dark via-primary-dark/70 to-black/40 z-10" />



          <div className="relative z-20 w-full flex justify-center px-8 lg:px-20">
            <div className="w-full md:container md:mx-auto py-16 lg:py-24">
              <p className="text-base lg:text-xl font-light text-white/80 mb-4">
                {isFa ? 'گروه مهندسی و ساخت' : 'Engineering & Manufacturing Group'}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                {isFa ? 'درباره فیدار سازه بندار' : 'About Fidar Sazeh Bandar'}
              </h1>
              <p className="mt-6 max-w-2xl text-lg lg:text-2xl font-light text-white/90 leading-relaxed">
                {isFa ? (
                  'مهندسی، ساخت، بازسازی و ارتقای تجهیزات انتقال مواد و ماشین‌آلات سنگین بندرگاهی'
                ) : (
                  'Engineering, manufacturing, refurbishment and upgrades for material handling systems and heavy port machinery.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#profile">
                  <button
                    type="button"
                    className="rounded-lg transition-all whitespace-nowrap bg-primary text-white hover:bg-black px-10 h-12 md:px-12 md:h-14 md:text-xl font-medium hover:rounded-[30px] cursor-pointer"
                  >
                    {isFa ? 'مشخصات گروه' : 'Company Profile'}
                  </button>
                </a>
                <a href="#contact">
                  <button
                    type="button"
                    className="rounded-lg transition-all whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-primary px-10 h-12 md:px-12 md:h-14 md:text-xl font-medium hover:rounded-[30px] cursor-pointer"
                  >
                    {isFa ? 'تماس با ما' : 'Contact us'}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section> */}


        {/* 2. "This is us" — Statement */}
        <section className="relative w-full bg-white">
          <div className="w-full flex justify-center px-8 lg:px-20">
            <div className="w-full md:container md:mx-auto">
              <div className="gap-5 lg:gap-10 flex flex-col py-20 lg:py-28 justify-center items-center">
                <Image className='mb-12' src={"/assets/images/logo_type.png"} alt="fidar bondar sazeh logo" width={400} height={200}></Image>
                <h2 className='text-2xl text-primary'>                  فیدارسازه بندار؛ مهندسی، ساخت و نوسازی برای عملکردی پايدارتر</h2>

                <div className="!leading-snug text-center text-slate-900 text-xl lg:text-3xl xl:text-2xl font-normal max-w-5xl mx-auto">
                  {isFa ? (
                    <>
                      <p>فیدار سازه بندار یک مجموعه مهندسی و ساخت تخصصی در حوزه تجهیزات انتقال مواد، ماشین آلات بندری و تجهیزات صنعتی سنگین است که با تکیه بر دانش مهندسی ، تجربه اجرایی و توان ساخت، راهکارهای جامع از طراحی و تولید تا بازسازی و ارتقای تجهیزات ارائه میدهد.</p>
                    </>
                  ) : (
                    <p>We are a knowledge-based engineering and manufacturing group. With advanced technology, engineering precision and future-oriented design, we optimize port terminals and heavy industries through next-generation material handling equipment.</p>
                  )}
                  <br></br>
                  <p>ما معتقدیم عملکرد پایدار تجهیزات، نتیجه ترکیب طراحی مهندسی، کیفیت ساخت، فناوری روز و شناخت عمیق از شرایط واقعی بهره برداری است. به همین دلیل، تمامی پروژه ها از تحلیل و طراحی تا ساخت، نصب، راه اندازی و پشتیبانی، با رویکردی یکپارچه و مهندسی شده اجرا میشوند.</p>

                </div>

              </div>
            </div>
          </div>
          
        </section>




        {/* 3. Vision & Mission — alternating blocks */}
        <section id="vision-mission" className="w-full overflow-hidden ">
          <div className="w-full overflow-hidden relative bg-primary-dark">
            <div className="w-full px-8 py-5 lg:p-0 flex flex-col  lg:items-center lg:min-h-[14rem]">
              <div className="h-80 lg:h-auto self-stretch lg:flex-[50%] rounded-tr-3xl rounded-bl-3xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  // style={{ backgroundImage: 'url("https://images.ctfassets.net/bdj0rlksezwc/6FoUC119IxDgJKfJATdJjz/0d73bf74b3fe9863bbf5360b874bda26/vision.jpg?w=2200&h=1479&fm=jpg&q=50")' }}
                />
              </div>
              <div className="lg:flex-[0_0_50%] flex flex-col items-center justify-center gap-6 lg:gap-10 pt-9 pb-12 lg:py-16 lg:px-16 xl:px-20 z-10">
                <h2 className="text-3xl lg:text-4xl font-medium text-white">{isFa ? 'مهندسی و ساخت تجهیزات پیشرفته' : 'Vision'}</h2>
                <p className="text-base md:text-lg xl:text-xl font-light text-white/90  leading-loose text-center">
                  {isFa ?
                    <>
                      توانمندی فیدارسازه بندار شامل طراحی و ساخت جرثقیل های بندرگاهی، تجهیزات انتقال و بارگیری کانتینر، تجهیزات جابه جایی مواد فله، جرثقیلهای صنعتی و تجهیزات فرایندی است.
                      <br></br>
                      ترکیب دانش های تخصصی در حوزههای سازه، مکانیک، برق، کنترل و اتوماسیون، امکان توسعه تجهیزاتی با عملکرد مطمئن، قابلیت نگهداری مناسب و عمر بهره برداری طولانی را فراهم می کند
                    </>
                    : (
                      'To simplify and empower manufacturing and port operations through advanced technology, engineering precision and future-oriented design — delivering ever-increasing productivity and sustainability for our customers.'
                    )}
                </p>
              </div>
            </div>
          </div>
          

          <div className="w-full overflow-hidden relative bg-primary-dark border-t border-white/10">
            <div className="w-full px-8 py-5 lg:p-0 flex flex-col lg:items-center  lg:min-h-[14rem]">
              {/* <div className="h-80 lg:h-auto self-stretch lg:flex-[50%] rounded-tr-3xl rounded-bl-3xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url("https://images.ctfassets.net/bdj0rlksezwc/mWYQ8AAHnePJkbDgMYnCz/e2d51a175da32db25f863037fbe38177/imag_MISSION.jpg?w=2334&h=1750&fm=jpg&q=50")' }}
                />
              </div> */}
              <div className="lg:flex-[0_0_50%] flex flex-col justify-center   items-center gap-6 lg:gap-10 pt-9 pb-12 lg:py-16 lg:px-16 xl:px-20 z-10">
                <h2 className="text-3xl lg:text-4xl font-medium text-white">{isFa ? 'نوسازی و ارتقای تجهیزات موجود' : 'Mission'}</h2>
                <p className="text-base md:text-lg xl:text-xl  font-light text-white/90  leading-loose text-center">
                  {isFa ? (
                    'ارائه راهکارهای کامل از طراحی و تولید تا بازسازی و به‌روزرسانی تجهیزات؛ با تکیه بر دانش مهندسی، تجربه اجرایی و توان ساخت، تا هر ماده و هر عملیاتی به پتانسیل کامل خود دست یابد.'
                  ) : (
                    'To deliver complete solutions — from design and manufacturing to refurbishment and upgrades — built on engineering know-how, execution experience and manufacturing capability, enabling every material and operation to reach its full potential.'
                  )}
                </p>
              </div>
            </div>
          </div>
          
          
          <div className="w-full overflow-hidden relative bg-primary-dark border-t border-white/10">
            <div className="w-full px-8 py-5 lg:p-0 flex flex-col lg:items-center  lg:min-h-[14rem]">
              {/* <div className="h-80 lg:h-auto self-stretch lg:flex-[50%] rounded-tr-3xl rounded-bl-3xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url("https://images.ctfassets.net/bdj0rlksezwc/6FoUC119IxDgJKfJATdJjz/0d73bf74b3fe9863bbf5360b874bda26/vision.jpg?w=2200&h=1479&fm=jpg&q=50")' }}
                />
              </div> */}
              <div className="lg:flex-[0_0_50%] flex flex-col justify-center  items-center gap-6 lg:gap-10 pt-9 pb-12 lg:py-16 lg:px-16 xl:px-20 z-10">
               <h2 className="text-3xl lg:text-4xl font-medium text-white">{isFa ? 'ساخت برای امروز، آماده برای آينده' : 'Vision'}</h2>
                <p className="text-base md:text-lg xl:text-xl max-w-[70%]  font-light text-white/90 text-center">
                  {isFa ? (
                    'تمرکز بر بهره وری انرژی ، اتوماسیون و فناوری های نوین، فیدارسازه بندار راهکارهایی ارائه میدهد که عالوه بر پاسخگویی به نیازهای امروز صنعت، قابلیت توسعه و تطبیق با نیازهای آینده را داشته باشند.'
                  ) : (
                    'To simplify and empower manufacturing and port operations through advanced technology, engineering precision and future-oriented design — delivering ever-increasing productivity and sustainability for our customers.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* 4. Genuine Mastery — full-width parallax band */}
        {/* <section className="relative h-[60vh]  overflow-hidden lg:block bg-surface">
          <div className="absolute inset-0">
            {slides.map((slide, index) => (<div key={slide.title.en}
              className={`absolute inset-0 transition-all duration-800 ease-in-out ${index === active ? "translate-y-0 opacity-100" : index < active ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"}`}
            >

              <Image src={slide.image} alt="" fill priority={index === 0} className="object-cover " sizes="100vw"
              />

              <div className="absolute inset-0 bg-black/40" />
            </div>
            ))}

          </div>
          <div className="relative z-20 h-full w-full overflow-hidden ">
            <div className="flex h-full w-full flex-col transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateY(-${active * 100}%)`, }}
            >
              {slides.map((slide, index) => (
                <div key={index}
                  className="h-full w-full shrink-0 items-center  hidden lg:flex " >
                  <div className=" w-full items-center pl-4 pr-4 ">
                    <h2 className="text-4xl font-normal leading-tight text-white lg:text-5xl"> {isFa ? slide.title.fa : slide.title.en} </h2>
                  </div>
                  <div className="flex h-full w-screen flex-col justify-end ">

                    <div className="flex h-1/4 w-full justify-end " >
                      <div
                        className="relative z-10 h-6 w-6 bg-surface self-end"
                        style={
                          isFa ?
                            {
                              WebkitMaskImage:
                                "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                              maskImage:
                                "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                            }
                            : {
                              WebkitMaskImage:
                                "radial-gradient(circle at 0% 0%, transparent 0 24px, black 24px)",
                              maskImage:
                                "radial-gradient(circle at 0% 0%, transparent 0 24px, black 24px)",
                            }
                        }
                      />
                      <div className="w-1/4 bg-surface" />

                    </div>

                    <div className={`flex h-[51%]  items-center  -mt-px -mb-px bg-surface py-9 pl-24 px-14 ${isFa ? "rounded-r-3xl" : "rounded-l-3xl"}`}>
                      <p className="text-2xl font-normal  leading-loose text-slate-900 lg:text-3xl"> {isFa ? slide.desc.fa : slide.desc.en} </p>
                    </div>

                    <div className="flex h-1/4 w-full justify-end">
                      <div
                        className="relative z-10 h-6 w-6 bg-surface"
                        style={isFa ? {
                          WebkitMaskImage:
                            "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                          maskImage:
                            "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                        }
                          : {
                            WebkitMaskImage:
                              "radial-gradient(circle at 0% 100%, transparent 0 24px, black 24px)",
                            maskImage:
                              "radial-gradient(circle at 0% 100%, transparent 0 24px, black 24px)",
                          }
                        }
                      />
                      <div className="w-1/4 bg-surface" />

                    </div>
                  </div>
                </div>))}
              {slides.map((slide, index) => (
                <div key={index}
                  className="h-full w-full shrink-0 items-center drop-shadow-2xl  sm:flex flex-col" >
                  <div className=" w-full items-center pl-4 pr-4 absolute top-[8%]">
                    <h2 className="text-3xl font-normal leading-tight text-white lg:text-5xl"> {isFa ? slide.title.fa : slide.title.en} </h2>
                  </div>
                  <div className="flex h-full w-full flex-col">

                    <div className={`flex h-2/4 w-full ${isFa ? "justify-end" : "justify-start"} `} >
                      <div
                        className="relative z-10 h-6 w-6 bg-surface self-end"
                        style={{
                          WebkitMaskImage:
                            "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                          maskImage:
                            "radial-gradient(circle at 100% 0%, transparent 0 24px, black 24px)",
                        }}
                      />

                    </div>

                    <div className="flex h-1/4  items-center rounded-r-3xl -mt-px -mb-px py-9 pl-14 pr-24 bg-surface">

                      <p className="text-xl font-normal  leading-tight text-slate-900 lg:text-4xl"> {isFa ? slide.desc.fa : slide.desc.en} </p>
                    </div>

                    <div className={`flex h-1/4 w-full  ${isFa ? "justify-end" : "justify-start"} `}>
                      <div
                        className="relative z-10 h-6 w-6 bg-surface"
                        style={{
                          WebkitMaskImage:
                            "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                          maskImage:
                            "radial-gradient(circle at 100% 100%, transparent 0 24px, black 24px)",
                        }}
                      />

                    </div>
                  </div>
                </div>))}
            </div>
          </div>
           */}


        {/* Dots */}
        {/* <div className={`absolute bottom-8 -mt-px z-30 flex gap-3 ${isFa ? "right-14" : "left-14"} `}>
            {slides.map((_, index) => (<button key={index} type="button" onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-10 bg-white" : "w-2 bg-white/50"}`} />))}
          </div> */}

        {/* </section> */}


        {/* 5. Company Profile — with all specifications */}
        {/* <section id="profile" className="relative w-full bg-surface">
          <div className="w-full flex justify-center px-8 lg:px-20">
            <div className="w-full md:container md:mx-auto">
              <div className="gap-5 lg:gap-10 flex flex-col pt-16 pb-10 lg:pt-20 lg:pb-12">
                <h2 className="text-center text-primary-dark text-4xl lg:text-5xl font-bold">
                  {isFa ? 'پروفایل شرکت و مشخصات گروه' : 'Company Profile & Group Specifications'}
                </h2>
                <p className="text-center text-slate-600 text-lg lg:text-xl font-light max-w-3xl mx-auto">
                  {isFa ? 'همه آنچه درباره فیدار سازه بندار باید بدانید' : 'Everything you need to know about Fidar Sazeh Bandar'}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start !leading-snug text-slate-900 text-base lg:text-lg xl:text-xl font-light mt-4">
                  <div className="space-y-5">
                    <p>
                      {isFa ? (
                        'فیدار سازه بندار یک مجموعه دانش‌بنیان مهندسی و ساخت تخصصی در حوزه تجهیزات انتقال مواد و ماشین‌آلات سنگین بندرگاهی است که با تکیه بر دانش مهندسی، تجربه اجرایی و رویکردی مبتنی بر دقت، کیفیت و نوآوری فعالیت می‌کند.'
                      ) : (
                        'Fidar Sazeh Bandar is a knowledge-based engineering and manufacturing group specialized in material handling systems and heavy port machinery, operating with engineering know-how, hands-on execution experience and an approach rooted in precision, quality and innovation.'
                      )}
                    </p>
                    <p>
                      {isFa ? (
                        'ما عملیات ترمینال‌های بندری را با بهره‌گیری از تکنولوژی پیشرفته و طراحی نسل جدید تجهیزات انتقال مواد بهینه می‌کنیم؛ از ترانستینرهای هیبرید RTG و تجهیزات جانبی بندرگاهی تا فن‌ها و بلوئرهای صنعتی.'
                      ) : (
                        'We optimize port terminal operations through advanced technology and next-generation material handling systems — from hybrid RTG cranes and port auxiliary equipment to industrial fans and blowers.'
                      )}
                    </p>
                    <p>
                      {isFa ? (
                        'خدمات تخصصی ما شامل تعمیرات تخصصی شناورها و سازه‌های دریایی، بازسازی و به‌روزرسانی الکتریکال و مکانیکال انواع تجهیزات بندری و صنعتی، و ارائه مشاوره فنی از طراحی تا بهره‌برداری است.'
                      ) : (
                        'Our specialized services cover expert repair of vessels and marine structures, electrical & mechanical refurbishment and upgrades of port and industrial equipment, plus technical consulting from design to operation.'
                      )}
                    </p>
                    <p>
                      {isFa ? (
                        'دفتر مرکزی این گروه در تهران، خیابان اسکندری، پلاک ۴۳۲، ساختمان پردیس واقع شده و کانال ارتباطی اصلی آن، تلفن ۰۲۱-۶۶۱۲۹۳۱۰ است.'
                      ) : (
                        'The group‘s headquarters are located at No. 432, Pardis Building, Eskandari Street, Tehran, with its main contact channel +98 21 6612 9310.'
                      )}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="transition-shadow flex flex-col gap-5 items-stretch rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200 p-8 lg:p-10">
                      <h3 className="text-2xl lg:text-3xl text-primary-dark leading-tight font-bold">
                        {isFa ? 'ارزش‌های ما' : 'Our Values'}
                      </h3>
                      <ul className="space-y-3 text-slate-700 font-light">
                        {values.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-none" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="transition-shadow flex flex-col gap-5 items-stretch rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200 p-8 lg:p-10">
                      <h3 className="text-2xl lg:text-3xl text-primary-dark leading-tight font-bold">
                        {isFa ? 'حضور بین‌المللی' : 'International Presence'}
                      </h3>
                      <p className="text-slate-700 font-light leading-relaxed">
                        {isFa ? (
                          'شبکه پروژه‌ها و شرکای ما در بنادر و صنایع سنگین، امکان ارائه تجربه‌ای چندصنعتی (multi-material) را برای مشتریان داخلی و بین‌المللی فراهم می‌کند.'
                        ) : (
                          'Our network of projects and partners across ports and heavy industries enables a truly multi-material experience for domestic and international customers.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* 6. All Specifications — specs grid */}
        {/* <section className="relative w-full bg-surface pb-16 lg:pb-24">
          <div className="w-full flex justify-center px-8 lg:px-20">
            <div className="w-full md:container md:mx-auto">
              <h2 className="text-center text-primary-dark text-3xl lg:text-5xl font-bold mb-12">
                {isFa ? 'مشخصات و توانمندی‌ها' : 'Specifications & Capabilities'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SPECS.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.title.en}
                      className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-4"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${spec.color} text-white flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-primary-dark leading-tight">{isFa ? spec.title.fa : spec.title.en}</h3>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">{isFa ? spec.desc.fa : spec.desc.en}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section> */}

        {/* 7. Governance & Approach — action cards */}
        {/* <section className="relative w-full py-10 lg:pt-20 lg:pb-24 overflow-hidden bg-surface">
          <div className="w-full flex justify-center px-8 lg:px-20 z-10 relative">
            <div className="w-full md:container md:mx-auto flex flex-col lg:flex-row gap-5 lg:gap-10 items-start justify-between">
              <div className="h-full flex-[1_1_60%]">
                <div className="transition-shadow flex flex-col gap-4 lg:gap-5 items-stretch rounded-3xl overflow-hidden pb-7 lg:pb-10 bg-white border border-gray-200">
                  <div
                    className="h-48 lg:h-80 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/assets/images/Rectangle_86.png")' }}
                  />
                  <div className="text-3xl text-primary-dark leading-tight font-bold px-5 lg:px-10 lg:text-4xl">
                    {isFa ? 'مهندسی و کیفیت' : 'Engineering & Quality'}
                  </div>
                  <div className="text-base lg:text-lg leading-snug font-light px-5 lg:px-10 lg:leading-normal text-slate-700">
                    {isFa ? (
                      'نظام مهندسی و کیفیت ما با استانداردهای بین‌المللی صنایع دریایی و بندری هماهنگ است و بر دقت، ایمنی و مسئولیت‌پذیری در تمام مراحل طراحی، ساخت، بازسازی و به‌روزرسانی استوار است.'
                    ) : (
                      'Our engineering and quality system aligns with international maritime and port industry standards, built on precision, safety and accountability across design, manufacturing, refurbishment and upgrades.'
                    )}
                  </div>
                </div>
              </div>

              <div className="h-full flex-[1_1_40%]">
                <div className="transition-shadow flex flex-col gap-4 lg:gap-5 items-stretch rounded-3xl overflow-hidden pb-7 lg:pb-10 bg-white border border-gray-200 pt-7 lg:pt-10">
                  <div className="text-3xl text-primary-dark leading-tight font-bold px-5 lg:px-10 lg:text-4xl">
                    {isFa ? 'رویکرد ما' : 'Our Approach'}
                  </div>
                  <div className="text-base lg:text-lg leading-snug font-light px-5 lg:px-10 lg:leading-normal text-slate-700">
                    {isFa ? (
                      'از نخستین تماس مشاوره تا تحویل و بهره‌برداری، فرآیندی شفاف، مهندسی‌شده و مبتنی بر نتایج را دنبال می‌کنیم؛ مشخصات پروژه شما را در همان ابتدا با جزئیات کامل بررسی و نقشه‌راه اجرایی ارائه می‌دهیم.'
                    ) : (
                      'From the first consultation call to delivery and operation, we follow a transparent, engineered, results-driven process — reviewing every project specification upfront and delivering a clear execution roadmap.'
                    )}
                  </div>
                  <div className="!mt-auto px-5 lg:px-10">
                    <a href="#contact">
                      <button
                        type="button"
                        className="rounded-lg transition-all whitespace-nowrap bg-transparent border border-primary text-primary px-10 h-12 md:px-12 md:h-14 md:text-xl font-medium hover:rounded-[30px] max-w-full truncate cursor-pointer hover:bg-primary hover:text-white"
                      >
                        {isFa ? 'کشف بیشتر' : 'Discover more'}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* 8. Fidar in the region — full-screen image block */}
        {/* <section className="bg-surface relative flex flex-col w-full sm:min-h-[32rem] min-h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.ctfassets.net/bdj0rlksezwc/5M8G9REET63gIAnA0IJnVh/998a413e5191145608039bb6b1e4a93f/Biesse_Por_do_Sol.jpg?w=1920&h=1080&fm=jpg&q=50")'
             }}
          />
          <div className="absolute inset-0 bg-black/50 z-10" />

          <div className="relative z-20 w-full flex justify-center items-center px-8 lg:px-20 py-24 flex-1">
            <div className="w-full md:container md:mx-auto">
              <div className="flex flex-col gap-5 w-full">
                <h2 className="text-white font-bold text-3xl lg:text-6xl">
                  {isFa ? 'فیدار سازه بندار در ایران' : 'Fidar Sazeh Bandar in Iran'}
                </h2>
                <p className="text-white/90 font-light text-xl lg:text-2xl">
                  {isFa ? 'تهران — خیابان اسکندری، پلاک ۴۳۲، ساختمان پردیس' : 'Tehran — No. 432, Pardis Building, Eskandari Street'}
                </p>
                <p className="text-white/80 font-light max-w-3xl text-base lg:text-lg mt-2">
                  {isFa ? (
                    'مستقر در پایتخت صنعتی ایران، نزدیک به بنادر جنوبی و مسیرهای لجستیک بین‌المللی؛ ما در قلب زنجیره تامین صنایع دریایی و بندری فعالیت می‌کنیم.'
                  ) : (
                    'Based in Iran’s industrial capital, close to southern ports and international logistics corridors — we operate at the heart of the maritime and port industries’ supply chain.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* 9. Our presence in the region — accordions */}
        {/* <section className="w-full flex justify-center px-8 lg:px-20 py-8 lg:py-20 bg-surface">
          <div className="w-full md:container md:mx-auto">
            <h3 className="font-bold text-4xl mb-8 text-primary-dark">
              {isFa ? 'حضور ما در منطقه' : 'Our presence in the region'}
            </h3>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 xl:gap-40 w-full">
              <div className="text-lg flex-1">
                <p className="text-slate-700 font-light leading-relaxed">
                  {isFa ? (
                    'شبکه شوروم‌ها، نمایشگاه‌ها و کانال‌های ارتباطی ما به مشتریان امکان می‌دهد تا تجربه‌ای واقعی از تجهیزات، فناوری‌ها و خدمات گروه فیدار سازه بندار به دست آورند.'
                  ) : (
                    'Our network of showrooms, exhibitions and communication channels lets customers enjoy a genuine hands-on experience of Fidar Sazeh Bandar’s equipment, technologies and services.'
                  )}
                </p>
              </div>

              <div className="flex-1">
                <div className="flex flex-col">
                  {ACCORDIONS.map((acc, index) => {
                    const Icon = acc.icon;
                    const isOpen = openAccordion === index;
                    return (
                      <div
                        key={acc.title.en}
                        className="border-x-0 border-b border-b-gray-300 border-t border-t-gray-300 bg-surface"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenAccordion(isOpen ? -1 : index)}
                          className="w-full flex items-center justify-between bg-surface py-4 cursor-pointer text-left gap-4"
                        >
                          <h4 className="font-medium text-xl flex items-center gap-3">
                            <Icon className={`w-5 h-5 text-primary ${isFa ? 'ml-1' : 'mr-1'}`} />
                            {isFa ? acc.title.fa : acc.title.en}
                          </h4>
                          <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="text-base lg:text-lg origin-top pb-6 text-slate-700 font-light pr-10">
                            <p>{isFa ? acc.content.fa : acc.content.en}</p>
                            <div className="w-fit mt-4 flex gap-4 items-center">
                              <a href="#contact" className="w-full">
                                <button
                                  type="button"
                                  className="rounded-lg transition-all whitespace-nowrap bg-primary text-white hover:bg-black px-5 h-10 md:px-6 text-sm hover:rounded-[20px] w-full cursor-pointer"
                                >
                                  {isFa ? acc.action.fa : acc.action.en}
                                </button>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* 10. Contact Section */}
        <ContactSection lang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        lang={currentLang}
        onOpenExporter={handleOpenExporter}
        onOpenAdmin={handleOpenAdmin}
      />


    </div>
  );
};

export default AboutUsPageComponent;
export { AboutUsPageComponent as AboutUsPage };