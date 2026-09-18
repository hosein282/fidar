import { ServiceItem, PortfolioProject, BlogPost, SEOMetaConfig, EstimatorFeature, MaterialData } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'php-custom-web',
    icon: 'Code2',
    category: 'development',
    title: {
      fa: 'توسعه تخصصی وب‌سایت با PHP و MySQL',
      en: 'Custom PHP 8 & MySQL Web Engineering'
    },
    shortDesc: {
      fa: 'طراحی سیستم‌های تحت وب اختصاصی با PHP مدرن، معماری MVC، دیتابیس MySQL بهینه‌شده و سرعت بارگذاری زیر ۰.۸ ثانیه.',
      en: 'Custom web platforms built with modern PHP 8, robust MVC architecture, high-performance MySQL databases & fast response times.'
    },
    fullDesc: {
      fa: 'تیم فنیفیدار بندار(Biesss Digital) پلتفرم‌های PHP اختصاصی و بدون وابستگی سنگین ارائه می‌دهد. کدهای تمیز، لایه‌های امنیتی در برابر SQL Injection و XSS، سیستم‌های کشینگ Redis/Memcached و ساختار مقیاس‌پذیر برای ترافیک‌های سنگین.',
      en: 'Biesss Digital constructs high-availability PHP web applications without monolithic overhead. Clean code standards, robust defense against SQLi/XSS, optimized MySQL indexing, and scalable architecture.'
    },
    features: {
      fa: [
        'کدنویسی اختصاصی PHP 8.3 با بالاترین استانداردها',
        'طراحی دیتابیس MySQL بهینه‌شده با فهارس و تیبل‌های کلین',
        'پیاده‌سازی پنل مدیریت سفارشی با مدیریت دسترسی‌ها',
        'پشتیبانی کامل از ساختار چندزبانه (فارسی و انگلیسی)',
        'رعایت استانداردهای امنیتی OWASP Top 10'
      ],
      en: [
        'Modern PHP 8.3 OOP & PSR-12 standard code',
        'Optimized MySQL relational database architecture',
        'Custom lightweight Admin CMS with role-based access',
        'Native multi-language engine (FA/EN switcher)',
        'Enterprise security compliant with OWASP Top 10'
      ]
    },
    technologies: ['PHP 8.3', 'MySQL 8.0', 'PDO', 'Tailwind CSS', 'Redis', 'Apache/Nginx']
  },
  {
    id: 'advanced-seo',
    icon: 'TrendingUp',
    category: 'marketing',
    title: {
      fa: 'سئوی پیشرفته و بهینه‌سازی موتورهای جستجو',
      en: 'Enterprise SEO & Organic Search Growth'
    },
    shortDesc: {
      fa: 'استراتژی جامع سئو آنپیج، تکتیکال، اسکیمای Structured Data و ساختار چندزبانه hreflang جهت کسب رتبه‌های برتر گوگل.',
      en: 'Comprehensive technical SEO, JSON-LD Schema integration, speed optimization, and multi-regional hreflang strategies for Top 1 Google rankings.'
    },
    fullDesc: {
      fa: 'سئوی اصولی پایه و اساس موفقیت کسب‌وکار آنلاین است. ما با ساخت سئو داینامیک، اسکیماهای استاندارد Organization, Article, Product، لینک‌سازی کانونی (Canonical) و بهینه‌سازی سرعت Core Web Vitals سایت شما را شتاب می‌بخشیم.',
      en: 'Strategic SEO drives qualified organic growth. We implement dynamic HTML head automation, structured Schema.org markups, canonical link validation, Core Web Vitals optimization, and multi-language hreflang mapping.'
    },
    features: {
      fa: [
        'تولید خودکار اسکیماهای JSON-LD گوگل',
        'مدیریت تگ‌های چندزبانه rel="alternate" hreflang',
        'نقشه سایت خودکار XML و فایل robots.txt هوشمند',
        'بهینه‌سازی کدهای HTML برای سرعت فوق‌العاده Core Web Vitals',
        'تگ‌های شبکه‌های اجتماعی Open Graph و Twitter Cards'
      ],
      en: [
        'Automated JSON-LD Schema injection',
        'Multi-language rel="alternate" hreflang tags',
        'Dynamic XML Sitemap & robots.txt generator',
        'Core Web Vitals performance optimization',
        'Open Graph & Twitter Card social meta tag suite'
      ]
    },
    technologies: ['JSON-LD', 'Google Search Console', 'Schema.org', 'PageSpeed Insights', 'Dynamic Meta Engine']
  },
  {
    id: 'ui-ux-design',
    icon: 'Palette',
    category: 'design',
    title: {
      fa: 'طراحی رابط و تجربه کاربری مدرن (UI/UX)',
      en: 'Modern UI/UX Design & Brand Experience'
    },
    shortDesc: {
      fa: 'خلق رابط‌های کاربری چشم‌نواز با الهام از سبک دارک و پریمیوم biesss.com، سازگاری کامل با راست‌چین (RTL) و چپ‌چین (LTR).',
      en: 'Crafting pixel-perfect visual interfaces with luxury dark aesthetics inspired by biesss.com, fully responsive for both RTL & LTR layouts.'
    },
    fullDesc: {
      fa: 'تجربه کاربری منحصربه‌فرد، ترافیک را به مشتری تبدیل می‌کند. ما پروژه‌های شما را با رعایت دقیق تایپوگرافی فارسی و انگلیسی، پالت‌های رنگی جذاب، افکت‌های نئون و فرآیندهای خرید/ثبت‌نام روان طراحی می‌کنیم.',
      en: 'Exceptional UX converts visitors into loyal clients. We design high-converting visual systems featuring fluid typography, micro-interactions, dark luxury themes, and seamless multi-device responsiveness.'
    },
    features: {
      fa: [
        'طراحی اختصاصی سازگار با دسکتاپ، تبلت و موبایل',
        'تایپوگرافی استاندارد فارسی (وزیرمتن/شبنم) و انگلیسی',
        'پالت رنگی دارک مود لوکس با جلوه‌های Glow نئونی',
        'سیستم کامپوننت‌محور و بهینه‌شده برای توسعه‌دهندگان',
        'تست قابلیت دسترسی (Accessibility WCAG AA)'
      ],
      en: [
        'Responsive layout tuned for mobile, tablet & desktop',
        'Bilingual typography hierarchy (Persian & English)',
        'Dark tech aesthetics with subtle glow accents',
        'Developer-friendly component design tokens',
        'WCAG AA Accessibility compliance'
      ]
    },
    technologies: ['Figma', 'Tailwind CSS', 'Responsive Grid', 'SVG Icons', 'Micro-interactions']
  },
  {
    id: 'bilingual-architecture',
    icon: 'Globe',
    category: 'architecture',
    title: {
      fa: 'معماری دو زبانه و دیتابیس چند زبانه',
      en: 'Native Bilingual Architecture (Persian & English)'
    },
    shortDesc: {
      fa: 'زیرساخت کامل چندزبانه در دیتابیس MySQL و کدهای PHP جهت سوئیچ آنی زبان فارسی (RTL) و انگلیسی (LTR).',
      en: 'Robust database schema & template architecture for instant Persian (RTL) and English (LTR) language switching.'
    },
    fullDesc: {
      fa: 'پشتیبانی نیتیو از سیستم دو زبانه بدون نیاز به افزونه‌های سنگین. جداول MySQL شامل ستون‌های مجزا مانند title_fa, title_en, content_fa, content_en و مدیریت روت‌های /fa/ و /en/ با فایل .htaccess.',
      en: 'Native bilingual infrastructure without heavy third-party plugins. MySQL database tables engineered with dual-column language storage and seamless URL routing via clean Apache rewrite modules.'
    },
    features: {
      fa: [
        'سوئیچ هوشمند جهت صفحه (RTL/LTR) بر اساس زبان',
        'نگهداری دیتای دو زبانه در جداول یکپارچه MySQL',
        'روتینگ آدرس‌های URL تمیز (/fa/about و /en/about)',
        'سوئیچ هوشمند سیستم فونت‌ها و اعداد (فارسی و انگلیسی)',
        'مدیریت آسان محتوا در پنل اختصاصی'
      ],
      en: [
        'Automatic document direction switching (RTL / LTR)',
        'Unified MySQL dual-column content schema',
        'Clean SEO-friendly URLs (/fa/about & /en/about)',
        'Smart font & localized digit system',
        'Single CMS control panel for bilingual updates'
      ]
    },
    technologies: ['PHP Sessions', 'MySQL UTF8MB4', 'RewriteEngine', 'RTL CSS Framework']
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'biesss-corporate',
    title: {
      fa: 'پلتفرم سازمانی فیدار سازه بندار',
      en: 'Biesss Digital Enterprise Hub'
    },
    client: {
      fa: 'گروه تکنولوژی بیس',
      en: 'Biesss Technology Group'
    },
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    summary: {
      fa: 'وب‌سایت مرجع سازمانی با معماری PHP 8 و دیتابیس MySQL، دوزبانه کاملاً بهینه‌شده برای موتورهای جستجو.',
      en: 'Enterprise portal engineered with modern PHP 8 & MySQL, featuring complete bilingual support & SEO optimization.'
    },
    challenge: {
      fa: 'نیاز به وب‌سایت پرسرعت چندزبانه با ظاهر لوکس و تیره، بدون استفاده از وردپرس و با قابلیت رتبه‌گیری سریع در کلمات کلیدی رقابتی.',
      en: 'Requirement for a ultra-fast bilingual platform with luxury dark theme, bypassing heavy CMS bloat to dominate competitive search queries.'
    },
    solution: {
      fa: 'پیاده‌سازی هسته اختصاصی PHP با کشینگ لایه دیتابیس، ساختار کامل JSON-LD Schema، و پنل مدیریت بسیار سبک و کاربرپسند.',
      en: 'Custom PHP architecture with MySQL query caching, complete Google Schema.org markups, and high-performance frontend.'
    },
    metrics: [
      { label: { fa: 'سرعت بارگذاری', en: 'Load Speed' }, value: '0.4s' },
      { label: { fa: 'امتیاز سئو گوگل', en: 'Google SEO Score' }, value: '99/100' },
      { label: { fa: 'رشد ورودی ارگانیک', en: 'Organic Traffic Growth' }, value: '+340%' }
    ],
    techStack: ['PHP 8.3', 'MySQL', 'Tailwind CSS', 'JSON-LD', 'Apache .htaccess']
  },
  {
    id: 'pay-portal-v2',
    title: {
      fa: 'سامانه تحلیل داده و پورتال خدمات',
      en: 'FinTech Analytics & Services Portal'
    },
    client: {
      fa: 'موسسه مالی پارس اکسپرت',
      en: 'Pars Expert Financial Group'
    },
    category: 'portal',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: {
      fa: 'پورتال امنیتی پیشرفته جهت ارائه گزارش‌های مالی و مشاوره تخصصی سرمایه‌گذاری با پشتیبانی از کاربران فارسی و بین‌المللی.',
      en: 'High-security analytics platform providing investment reporting and client dashboard for global users.'
    },
    challenge: {
      fa: 'ارائه نمودارهای لحظه‌ای، امنیت بالای داده‌های مشتریان و سرعت بالای استعلام‌ها در دیتابیس میلیونی MySQL.',
      en: 'Real-time financial charts, strict client data protection, and high-throughput MySQL queries for large datasets.'
    },
    solution: {
      fa: 'بهینه‌سازی کئوری‌های SQL، ایندکس‌گذاری دیتابیس، و طراحی پنل دوزبانه با امنیت OWASP.',
      en: 'Indexed MySQL relational queries, SSL/PDO parameterization, and dark theme dashboard UI.'
    },
    metrics: [
      { label: { fa: 'کاربران فعال', en: 'Active Users' }, value: '85,000+' },
      { label: { fa: 'زمان پاسخ دیتابیس', en: 'Database Query Time' }, value: '12ms' }
    ],
    techStack: ['PHP', 'MySQL InnoDB', 'Chart.js', 'REST API', 'RTL Engine']
  },
  {
    id: 'lux-shop-en-fa',
    title: {
      fa: 'فروشگاه آنلاین بین‌المللی کالای لوکس',
      en: 'Luxury International E-Commerce'
    },
    client: {
      fa: 'برند آریا گالری',
      en: 'Ariya Gallery Group'
    },
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    summary: {
      fa: 'سیستم فروشگاهی اختصاصی با قابلیت درگاه‌های پرداخت چندگانه (ریالی و بین‌المللی)، مدیریت دو زبانه محصولات و سئوی فروشگاهی.',
      en: 'Custom e-commerce solution with dual currency/payment options, bilingual catalog, and rich product Schema.org.'
    },
    challenge: {
      fa: 'پشتیبانی همزمان از قیمت‌گذاری به تومان و دلار، سوئیچ ارز و زبان بدون پرش صفحه و ثبت سفارشات در دیتابیس MySQL.',
      en: 'Simultaneous support for Toman & USD pricing, zero-flicker currency conversion, and atomic transactional DB updates.'
    },
    solution: {
      fa: 'معماری دیتابیس با جداول مجزای قیمت و زبان، ماژول تخفیف اختصاصی و سئوی فوق‌العاده محصولات.',
      en: 'Multi-currency DB table schema, custom PHP voucher engine, and automated Google Rich Product Snippets.'
    },
    metrics: [
      { label: { fa: 'افزایش فروش', en: 'Revenue Increase' }, value: '+215%' },
      { label: { fa: 'تبدیل کاربر به خریدار', en: 'Conversion Rate' }, value: '4.8%' }
    ],
    techStack: ['PHP PDO', 'MySQL', 'Payment Gateways', 'Rich Snippets SEO']
  }
];

export const INITIAL_ARTICLES: BlogPost[] = [
  {
    id: 'art-1',
    postType: 'article',
    slug: {
      fa: 'آموزش-طراحی-سایت-دوزبانه-با-php-و-mysql',
      en: 'building-bilingual-php-mysql-website-guide'
    },
    title: {
      fa: 'راهنمای جامع ساخت وب‌سایت دوزبانه با PHP 8 و MySQL (اصول سئو و RTL)',
      en: 'Comprehensive Guide: Building a Bilingual PHP 8 & MySQL Website for SEO'
    },
    excerpt: {
      fa: 'بررسی معماری دیتابیس MySQL، مدیریت زبان‌ها با PHP، تنظیمات hreflang و استانداردهای طراحی RTL جهت کسب رتبه‌های گوگل.',
      en: 'Explore MySQL table architecture, language handling in PHP, hreflang meta configuration, and RTL visual principles.'
    },
    content: {
      fa: `طراحی و پیاده‌سازی وب‌سایت دوزبانه (فارسی و انگلیسی) با PHP و دیتابیس MySQL یکی از پرکاربردترین راهکارهای ایجاد وب‌سایت‌های شرکتی، خدماتی و سازمانی پرسرعت است.

### ۱. معماری دیتابیس MySQL برای دو زبان
بهترین متدولوژی جهت ساخت دیتابیس دوزبانه در MySQL، استفاده از جداول یکپارچه با ستون‌های جداگانه برای هر زبان است:
- \`title_fa\` و \`title_en\`
- \`content_fa\` و \`content_en\`
- \`seo_desc_fa\` و \`seo_desc_en\`

این روش باعث افزایش سرعت اجرای Queryها و سادگی کدنویسی در PHP می‌شود.

### ۲. سئو و تگ‌های hreflang گوگل
برای اینکه گوگل صفحات فارسی و انگلیسی شما را به عنوان محتوای تکراری (Duplicate Content) در نظر نگیرد، باید تگ‌های زیر در بخش \`<head>\` قرار گیرند:
\`\`\`html
<link rel="alternate" hreflang="fa" href="https://fidarbondar.com/fa/page" />
<link rel="alternate" hreflang="en" href="https://fidarbondar.com/en/page" />
<link rel="canonical" href="https://fidarbondar.com/fa/page" />
\`\`\`

### ۳. مدیریت راست‌چین (RTL) و چپ‌چین (LTR)
با استفاده از تگ \`<html dir="rtl" lang="fa">\` برای فارسی و \`<html dir="ltr" lang="en">\` برای انگلیسی، فونت‌ها و چیدمان به صورت خودکار تغییر می‌کنند.`,
      en: `Engineering a bilingual (Persian & English) web application using PHP 8 and MySQL database delivers exceptional speed and control for enterprise systems.

### 1. MySQL Database Architecture for Multi-Language
The recommended schema design stores localized content within unified database tables using language-suffixed columns:
- \`title_fa\` & \`title_en\`
- \`content_fa\` & \`content_en\`
- \`seo_description_fa\` & \`seo_description_en\`

This approach ensures zero SQL joins overhead and simplifies CRUD operations in PHP.

### 2. Technical SEO & Hreflang Tagging
To guide search engines and avoid duplicate content issues, inject regional alternate tags in your HTML header:
\`\`\`html
<link rel="alternate" hreflang="fa" href="https://fidarbondar.com/fa/page" />
<link rel="alternate" hreflang="en" href="https://fidarbondar.com/en/page" />
<link rel="canonical" href="https://fidarbondar.com/en/page" />
\`\`\`

### 3. Directional Layouts (RTL vs LTR)
By updating the HTML root attribute dynamically (\`<html dir="rtl" lang="fa">\` for Persian and \`<html dir="ltr" lang="en">\` for English), font families and layout grids adapt instantly.`
    },
    author: {
      fa: 'تیم فنیفیدار بنداردیجیتال',
      en: 'Biesss Engineering Team'
    },
    date: '2026-07-28',
    readTime: '6 min read',
    category: {
      fa: 'توسعه وب و سئو',
      en: 'Web Dev & SEO'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    seoTitle: {
      fa: 'راهنمای ساخت سایت دوزبانه PHP و MySQL |فیدار بنداردیجیتال',
      en: 'Building Bilingual PHP & MySQL Web Apps Guide | Biesss'
    },
    seoDescription: {
      fa: 'آموزش کامل پیاده‌سازی سایت دوزبانه با PHP 8، ساختار جداول MySQL، سئو چندزبانه و تگ‌های hreflang.',
      en: 'Complete developer guide for building high-performance bilingual PHP & MySQL websites with technical SEO.'
    },
    seoKeywords: {
      fa: ['سایت دوزبانه PHP', 'دیتابیس MySQL چندزبانه', 'سئو سایت چندزبانه', 'طراحی سایت فیدار بندار'],
      en: ['Bilingual PHP website', 'MySQL multi-language schema', 'Technical SEO hreflang', 'Biesss digital group']
    },
    views: 1420
  },
  {
    id: 'art-2',
    postType: 'article',
    slug: {
      fa: 'اصول-سئو-تکنیکال-در-کدنویسی-php',
      en: 'technical-seo-best-practices-in-php'
    },
    title: {
      fa: '۱۰ اصل سئوی تکنیکال در توسعه سایت‌های PHP برای رسیدن به لینک یک گوگل',
      en: '10 Crucial Technical SEO Best Practices for PHP Web Applications'
    },
    excerpt: {
      fa: 'نحوه مدیریت ریدایرکت‌ها، سرعت Core Web Vitals، کشینگ در PHP، کئوری‌های بهینه‌شده MySQL و ساختار URLs.',
      en: 'Mastering HTTP response codes, query optimizations, dynamic sitemaps, and Core Web Vitals in custom PHP.'
    },
    content: {
      fa: `سرعت و سئوی تکنیکال دو رکن جدایی‌ناپذیر در موفقیت هر وب‌سایتی هستند. در وب‌سایت‌هایی که با PHP اختصاصی ساخته می‌شوند، دسترسی کامل به هدرها، روتینگ و خروجی دیتابیس داریم.

### نکات کلیدی سئوی تکنیکال PHP:
۱. **تنظیم دقیق HTTP Headers:** ارسال هدرهای 200 OK، 301 Redirect و 404 Not Found با دستور \`header()\`.
۲. **سرعت کوئری‌های دیتابیس:** استفاده از PDO Prepared Statements و ایندکس‌گذاری ستون‌های پرکاربرد در MySQL.
۳. **تولید خودکار sitemap.xml:** ساخت فایلهای XML به صورت داینامیک مستقیم از دیتابیس MySQL.
۴. **تگ‌های Open Graph:** برای اشتراک‌گذاری زیبا در شبکه‌های اجتماعی (تلگرام، ایتا، واتساپ، لینکدین).`,
      en: `Speed and technical SEO are the foundation of organic ranking success. In custom PHP applications, developers possess total authority over response headers, SQL execution time, and markup structure.

### Key Technical SEO Rules:
1. **Accurate HTTP Status Headers:** Emitting proper 200, 301, and 404 codes via PHP's \`header()\` function.
2. **Database Query Profiling:** Using indexed columns in MySQL and PDO statement reuse to guarantee <50ms query times.
3. **Dynamic XML Sitemap:** Automatically serving fresh sitemaps directly from MySQL tables.
4. **Rich Social Snippets:** Ingesting Open Graph and Twitter card tags directly into the view layout.`
    },
    author: {
      fa: 'واحد سئوی فیدار بندار',
      en: 'Biesss SEO Specialists'
    },
    date: '2026-07-20',
    readTime: '8 min read',
    category: {
      fa: 'سئو تکنیکال',
      en: 'Technical SEO'
    },
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    seoTitle: {
      fa: 'اصول سئوی تکنیکال در کدنویسی PHP | وبلاگ بیس',
      en: 'Technical SEO Best Practices in PHP | Biesss Blog'
    },
    seoDescription: {
      fa: 'راهکارهای عملی افزایش سرعت و سئوی تکنیکال در پروژه‌های PHP اختصاصی و دیتابیس MySQL.',
      en: 'Actionable technical SEO practices for custom PHP and MySQL database driven web platforms.'
    },
    seoKeywords: {
      fa: ['سئو تکنیکال PHP', 'سرعت دیتابیس MySQL', 'تولید sitemap.xml', 'بهینه‌سازی وب'],
      en: ['PHP technical SEO', 'MySQL performance optimization', 'Dynamic XML sitemap PHP', 'Core Web Vitals']
    },
    views: 980
  }
];

export const INITIAL_NEWS: BlogPost[] = [
  {
    id: 'news-1',
    postType: 'news',
    slug: {
      fa: 'رونمایی-فیدار بندار-از-نسل-جدید-موتورهای-دیجیتال',
      en: 'Fidar Bondar-unveils-new-generation-digital-engine'
    },
    title: {
      fa: 'رونمایی گروه فیدار بندار از نسل جدید سیستم مدیریت محتوای PHP 8 و پردازش چندزبانه',
      en: 'Fidar Bondar Group Unveils Next-Generation PHP 8 & Multilingual Digital Platform'
    },
    excerpt: {
      fa: 'گروه صنعتی و دیجیتال فیدار بندار از جدیدترین فناوری هماهنگ‌سازی دیتابیس MySQL و موتور وب‌سایت‌های بین‌المللی رونمایی کرد.',
      en: 'Fidar Bondar Group launches state-of-the-art PHP 8 web architecture integrated with real-time MySQL database synchronization.'
    },
    content: {
      fa: `گروه فیدار بندار به عنوان یکی از پیشگامان صنعت و فناوری دیجیتال، از نسخه جدید پلتفرم دیجیتال خود رونمایی کرد. این پلتفرم با تکیه بر هسته PHP 8 و دیتابیس بهینه‌شده MySQL، سرعت بارگذاری صفحات را تا ۶۰٪ افزایش داده است.

همچنین قابلیت مدیریت اخبار و مقالات به صورت جداگانه در دیتابیس، امکان اطلاع‌رسانی دقیق و به‌روزرسانی محتوایی سریع را برای مدیران فراهم کرده است.`,
      en: `Fidar Bondar Group, a global leader in industrial technology and digital solutions, announces its updated enterprise web suite. Built on PHP 8 and MySQL, the system reduces latency by 60%.

The new architecture includes dedicated database schemas for press releases, news, and technical articles.`
    },
    author: {
      fa: 'روابط عمومی فیدار بندار',
      en: 'Fidar Bondar Press Office'
    },
    date: '2026-08-01',
    readTime: '3 min read',
    category: {
      fa: 'اخبار و اطلاعیه‌ها',
      en: 'News & Announcements'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    seoTitle: {
      fa: 'اخبار رسمی گروه فیدار بندار | رونمایی از پلتفرم جدید PHP',
      en: 'Fidar Bondar Group Official News | PHP Platform Launch'
    },
    seoDescription: {
      fa: 'جدیدترین اخبار و اطلاعیه‌های رسمی گروه صنعتی و دیجیتال فیدار بندار درباره تکنولوژی‌های وب و دیتابیس.',
      en: 'Official news and press releases from Fidar Bondar Group regarding web technology and database innovations.'
    },
    seoKeywords: {
      fa: ['اخبار فیدار بندار', 'تکنولوژی PHP 8', 'اطلاعیه دیتابیس', 'فیدار سازه بندار'],
      en: ['Fidar Bondar news', 'PHP 8 technology', 'Database announcement', 'Fidar Bondar Digital']
    },
    views: 2150
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  ...INITIAL_ARTICLES,
  ...INITIAL_NEWS
];

export const INITIAL_SEO_META: SEOMetaConfig = {
  siteTitle: {
    fa: 'فیدار سازه بندار',
    en: 'Fidar Saze Bondar'
  },
  metaDescription: {
    fa: "ما عملیات ترمینال های بندری را با استفاده از تکنولوژی پیشرفته و طراحی نسل جدید تجهیزات انتقال مواد بندگارهی بهینه می کنیم",
    en: 'We optimize port terminal operations using advanced technology and next-generation design of port material handling equipment.'
  },
  keywords: {
    fa: [
      'فیدار سازه بندار',
      'تجهیزات انتقال مواد بندرگاهی',
      'طراحی و ساخت جرثقیل بندری',
      'جرثقیل کانتینربر',
      'جرثقیل RTG',
      'جرثقیل RMG',
      'جرثقیل ساحلی STS',
      'تجهیزات تخلیه و بارگیری مواد فله',
      'تجهیزات جابه‌جایی کانتینر',
      'مهندسی تجهیزات بندری',
      'بهینه‌سازی عملیات ترمینال بندری',
      'ساخت تجهیزات بندرگاهی ایران',
      'اتوماسیون ترمینال کانتینری',
      'بالابر و مکانیزم انتقال مواد فله',
      'طراحی نسل جدید تجهیزات بندری'
    ],
    en: [
      'Fidar Saze Bondar',
      'port material handling equipment',
      'port crane design and manufacturing',
      'container handling crane',
      'RTG crane',
      'RMG crane',
      'STS shore crane',
      'bulk material loading and unloading equipment',
      'container handling systems',
      'port equipment engineering',
      'port terminal operation optimization',
      'port equipment manufacturer Iran',
      'container terminal automation',
      'bulk material transfer system',
      'next-generation port equipment design'
    ]
  },

  ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  canonicalUrl: 'https://fidarbondar.com',
  twitterHandle: '@fidarbondar',
  indexingEnabled: true,
  structuredDataSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Biesss Digital Studio',
    'url': 'https://fidarbondar.com',
    'logo': 'https://fidarbondar.com/logo.webp',
    'sameAs': [
      'https://linkedin.com/company/fidarbondar',
      'https://twitter.com/fidarbondar'
    ],
    'knowsLanguage': ['fa', 'en'],
    'description': 'We optimize port terminal operations using advanced technology and next-generation design of port material handling equipment.'
  }
};

export const ESTIMATOR_FEATURES: EstimatorFeature[] = [
  {
    id: 'bilingual_core',
    name: {
      fa: 'سیستم کامل دو زبانه (فارسی RTL / انگلیسی LTR)',
      en: 'Native Bilingual System (Persian RTL & English LTR)'
    },
    priceUSD: 250,
    category: 'core',
    recommended: true
  },
  {
    id: 'php_mysql_db',
    name: {
      fa: 'هسته اختصاصی PHP 8 + دیتابیس بهینه‌شده MySQL',
      en: 'Custom PHP 8 Core + Optimized MySQL Relational Database'
    },
    priceUSD: 400,
    category: 'backend',
    recommended: true
  },
  {
    id: 'seo_suite_pro',
    name: {
      fa: 'پکیج کامل سئوی تکنیکال (JSON-LD, Hreflang, Sitemap, OG Tags)',
      en: 'Pro Technical SEO Suite (JSON-LD, Hreflang, XML Sitemap, OG Tags)'
    },
    priceUSD: 300,
    category: 'seo',
    recommended: true
  },
  {
    id: 'custom_admin_cms',
    name: {
      fa: 'پنل مدیریت اختصاصی محتوا (CMS) با مدیریت دسترسی',
      en: 'Lightweight Custom Admin CMS Panel with Access Control'
    },
    priceUSD: 350,
    category: 'backend'
  },
  {
    id: 'biesss_dark_theme',
    name: {
      fa: 'طراحی اختصاصی UI/UX با سبک دارک نئونی biesss.com',
      en: 'Exclusive UI/UX Design with biesss.com Dark Tech Aesthetics'
    },
    priceUSD: 300,
    category: 'design',
    recommended: true
  },
  {
    id: 'project_calculator_tool',
    name: {
      fa: 'سیستم محاسبه قیمت و فرم استعلام آنلاین مشتریان',
      en: 'Interactive Project Estimator & Client Consultation Form'
    },
    priceUSD: 180,
    category: 'core'
  },
  {
    id: 'security_owasp',
    name: {
      fa: 'لایه‌های امنیتی PDO anti-SQLi و محافظت ضد XSS و CSRF',
      en: 'OWASP Security Suite (PDO anti-SQLi, XSS Sanitization & CSRF tokens)'
    },
    priceUSD: 200,
    category: 'security',
    recommended: true
  }
];

export const MATERIALS: MaterialData[] = [
  {
    id: 0,
    slugEn: 'fidar-sazeh-bandar-engineering-technology',
    slugFa: 'تکنولوژی-مهندسی-فیدار-سازه-بندار',
    nameEn: 'Engineering Technology',
    nameFa: 'تکنولوژی مهندسی فیدار سازه بندار',
    slides: [],
    color: 'var(--color-wood)',
    descEn: "We manufacture machines designed to simplify the production process for our customers who work with wood in the furniture and window and door industry.",
    descFa: "در فیدارسازه بندار، طراحی و ساخت بر پایه مهندسی دقیق، شناخت عمیق تجهیزات و توجه به الزامات عملکردی پروژه انجام می شود. محصوالت ما حاصل ترکیب توان طراحی مهندسی، دقت ساخت و رویکرد توسعه‌محور است.",
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-2.webp',
    videoUrl: ",",

  },
  {
    id: 1,
    slugEn: 'container-loading-and-unloading-cranes',
    slugFa: 'جرثقیل‌های-تخلیه-و-بارگیری-کانتینر',
    nameEn: 'Port Material Handling Equipment',
    nameFa: 'تجهیزات انتقال مواد بندرگاهی',
    slides: [],
    videoUrl: ",",
    color: 'var(--color-glass)',
    descEn: 'Design and manufacturing of various port material handling equipment with a focus on reliability, operational precision, safety, and efficiency; from conventional solutions to modern and energy-efficient technologies.',
    descFa: 'طراحی و ساخت انواع تجهیزات انتقال مواد بندرگاهی با تمرکز بر قابلیت اطمینان، دقت عملکرد، ایمنی و بهره وری؛ از راهکارهای متعارف تا فناوری های نوین و کم مصرف.',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-3.webp',

  },
  {
    id: 2,
    slugEn: 'mobile-and-shore-rail-cranes',
    slugFa: 'جرثقیل‌های-موبایل-و-ریلی-ساحلی',
    nameEn: 'Industrial Cranes',
    nameFa: 'جرثقیل های صنعتی',
    slides: [],
    videoUrl: ",",

    color: 'var(--color-stone)',
    descEn: 'Design and manufacturing of various gantry and overhead industrial cranes with an engineering approach, manufacturing precision, and a focus on safety and stable performance. Fidar Sazeh Bandar offers specialized material handling solutions tailored to the needs of various industries.',
    descFa: 'طراحی و ساخت انواع جرثقیل‌های صنعتی دروازه ای و سقفی با رویکرد مهندسی، دقت ساخت و تمرکز بر ایمنی و عملکرد پایدار. فیدارسازه بندار راهکارهای تخصصی جابه جایی مواد را متناسب با نیاز صنایع مختلف ارائه می دهد.',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-4.webp',
  },
  {
    id: 3,
    slugEn: 'bulk-material-loading-and-unloading-equipment',
    slugFa: 'تجهیزات-تخلیه-و-بارگیری-مواد-فله',
    nameEn: 'Process Equipment and Power Transmission',
    nameFa: 'تجهیزات فرایندی و انتقال توان',
    slides: [],
    videoUrl: ",",

    color: 'var(--color-materia)',
    descEn: 'Engineered solutions in the field of industrial rotating equipment; including the design and manufacturing of various fans, blowers, and power transmission systems with emphasis on quality, efficiency, and reliability.',
    descFa: 'راهکارهای مهندسی شده در حوزه تجهیزات دوار صنعتی؛ شامل طراحی و ساخت انواع فن، بلوئر و سیستم های انتقال قدرت با تأکید بر کیفیت، راندمان و قابلیت اطمینان',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-5.webp',
  },
];

export const MATERIALS_DETAILS: MaterialData[] = [

  {
    id: 0,
    slugEn: 'fidar-sazeh-bandar-engineering-technology',
    slugFa: 'تکنولوژی-مهندسی-فیدار-سازه-بندار',
    nameEn: 'Fidar Sazeh Bandar Engineering Technology',
    nameFa: 'تکنولوژی مهندسی فیدار سازه بندار',
    color: 'var(--color-wood)',
    descEn:
      'Fidar Sazeh Bandar, specializing in the design and construction of port material handling equipment, offers engineered solutions for safe, precise, and efficient cargo movement in harsh operational environments. Our products include a variety of port cranes, container handling equipment, and systems related to loading and unloading operations, developed for stable and long-term performance through engineering knowledge, precise design, and controlled manufacturing processes. Our focus is on providing equipment that, in addition to meeting today’s operational needs, offers upgradeability, energy consumption optimization, and adaptability to modern port technologies. Precise engineering for reliable handling; from design to operation.',
    descFa:
      'فیدار سازه بندار با تخصص در طراحی و ساخت تجهیزات انتقال مواد بندرگاهی، راهکارهای مهندسی‌شده‌ای برای جابه‌جایی ایمن، دقیق و بهره‌ور بار در محیط‌های عملیاتی سخت ارائه می‌دهد.\n محصولات ما شامل انواع جرثقیل‌های بندرگاهی، تجهیزات جابه‌جایی کانتینر و سیستم‌های مرتبط با عملیات تخلیه و بارگیری است که با بهره‌گیری از دانش مهندسی، طراحی دقیق و فرآیند ساخت کنترل‌شده، برای عملکرد پایدار و طولانی‌مدت توسعه می‌یابند.\n تمرکز ما بر ارائه تجهیزاتی است که علاوه بر پاسخگویی به نیازهای عملیاتی امروز، قابلیت ارتقا، بهینه‌سازی مصرف انرژی و انطباق با فناوری‌های نوین بندری را داشته باشند.\n مهندسی دقیق برای جابه‌جایی مطمئن. از طراحی تا بهره‌ برداری.',
    slides: [
      {
        nameEn: 'Container Cranes (RTG, RMG)',
        nameFa: 'جرثقیل‌های کانتینربر (RTG، RMG)',
        descEn:
          'Where speed, precision, and operational space must be managed simultaneously. Fidar Sazeh Bandar RTG cranes, with an engineered design for the new generation of container terminals, offer a combination of productivity, flexibility, and precise load control.',
        descFa:
          'جایی که سرعت، دقت و فضای عملیاتی باید همزمان مدیریت شوند. جرثقیل‌های RTG فیدار سازه بندار با طراحی مهندسی‌شده برای نسل جدید پایانه‌های کانتینری، ترکیبی از بهره‌وری، انعطاف‌پذیری و کنترل دقیق بار را ارائه می‌دهد.',
        imgUrl: '/assets/images/services/4294-2.webp',
      },
      {
        nameEn: 'Mobile and Shore Rail Cranes',
        nameFa: 'جرثقیل‌های موبایل و ریلی ساحلی',
        descEn:
          'A combination of mobility, capacity, and precise load control for heavy operations at the dock and port areas. Fidar Sazeh Bandar shore and rail cranes, designed according to operating conditions, provide extensive coverage of the working area and fast, reliable cargo movement; a flexible solution for ports and industries with diverse operational needs.',
        descFa:
          'ترکیبی از تحرک، ظرفیت و کنترل دقیق بار برای عملیات سنگین در اسکله و محوطه‌های بندری. جرثقیل‌های ساحلی و ریلی فیدار سازه بندار با طراحی متناسب با شرایط بهره‌برداری، امکان پوشش گسترده محدوده کاری و جابه‌جایی سریع و مطمئن بار را فراهم می‌کنند؛ راهکاری منعطف برای بنادر و صنایع با نیازهای متنوع عملیاتی.',
        imgUrl: '/assets/images/services/4294-3.webp',
      },
      {
        nameEn: 'Bulk Material Loading and Unloading Equipment',
        nameFa: 'تجهیزات تخلیه و بارگیری مواد فله',
        descEn:
          'Uninterrupted material flow, where capacity, speed, and control must work together. Fidar Sazeh Bandar offers engineered solutions for unloading, transferring, and loading various types of port bulk materials; equipment suited to the nature of the cargo and operating conditions, aimed at increasing handling capacity, reducing operation time, and sustainable operation.',
        descFa:
          'جریان بی‌وقفه مواد، جایی که ظرفیت، سرعت و کنترل باید در کنار هم عمل کنند. فیدار سازه بندار راهکارهای مهندسی‌شده برای تخلیه، انتقال و بارگیری انواع مواد فله بندرگاهی ارائه می‌دهد؛ تجهیزاتی متناسب با ماهیت بار و شرایط عملیاتی، با هدف افزایش ظرفیت جابه‌جایی، کاهش زمان عملیات و بهره‌برداری پایدار.',
        imgUrl: '/assets/images/services/4294-5.webp',
      },
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  },
  {
    id: 1,
    slugEn: 'container-loading-and-unloading-cranes',
    slugFa: 'جرثقیل‌های-تخلیه-و-بارگیری-کانتینر',
    nameEn: 'Container Loading and Unloading Cranes',
    nameFa: 'جرثقیل‌های تخلیه و بارگیری کانتینر',
    color: 'var(--color-glass)',
    slides: [],
    descEn:
      'From shore container cranes (STS) to RTG cranes, Fidar Sazeh Bandar designs and manufactures a wide range of specialized container handling and loading equipment. This product range meets the diverse needs of docks, container terminals, and container storage and transfer yards. The design of each container handling equipment is the result of a multi-layered engineering process; from structural and fatigue analysis, design of hoisting and travel mechanisms, determination of working class and equipment life, to the integration of electrical, drive, control, and safety systems. Equipment design in accordance with current international standards guarantees its high reliability. The true complexity of container equipment is not summarized merely in lifting capacity; anti-sway load control, precise positioning, collision prevention, motion coordination, automation, energy management, and reliability in heavy duty cycles are all part of the engineering of a modern crane. In Fidar Sazeh Bandar cranes, from structural design to system intelligence; integrated engineering for the new generation of container operations has been realized.',
    descFa:
      'از جرثقیل‌های کانتینربر ساحلی (STS) تا جرثقیل‌های RTG، فیدار سازه بندار طیف گسترده‌ای از تجهیزات تخصصی جابه‌جایی و بارگیری کانتینر را طراحی و تولید می‌کند. این دامنهٔ محصول، پاسخگوی نیازهای متنوع اسکله، پایانه‌های کانتینری و محوطه‌های نگهداری و انتقال کانتینر است. طراحی هر تجهیز کانتینربر، حاصل یک فرآیند چندلایه مهندسی است؛ از تحلیل سازه و خستگی، طراحی مکانیزم‌های بالابری و حرکت، تعیین کلاس کاری و عمر تجهیز تا یکپارچه‌سازی سیستم‌های برق، درایو، کنترل و ایمنی. طراحی تجهیزات مطابق با استانداردهای بین‌المللی روز، قابلیت اطمینان بالای آن را تضمین می‌نماید. پیچیدگی واقعی تجهیزات کانتینری تنها در ظرفیت باربرداری خلاصه نمی‌شود؛ کنترل نوسان بار (Anti-Sway)، موقعیت‌یابی دقیق، جلوگیری از برخورد، هماهنگی حرکات، اتوماسیون، مدیریت انرژی و قابلیت اطمینان در سیکل‌های کاری سنگین، همگی بخشی از مهندسی یک جرثقیل مدرن هستند. در جرثقیل‌های فیدار سازه بندار، از طراحی سازه تا هوشمندی سیستم؛ مهندسی یکپارچه برای نسل جدید عملیات کانتینری تحقق یافته است.',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v',
  },
  {
    id: 2,
    slugEn: 'mobile-and-shore-rail-cranes',
    slugFa: 'جرثقیل‌های-موبایل-و-ریلی-ساحلی',
    nameEn: 'Mobile and Shore Rail Cranes',
    nameFa: 'جرثقیل‌های موبایل و ریلی ساحلی',
    color: '',
    slides: [],

    descEn:
      'Fidar Sazeh Bandar, with a specialized and experienced team in the design and construction of harbor mobile cranes, offers solutions for loading and unloading all types of vessels and handling materials and containers; equipment that provides the operator with a combination of high mobility, extensive working radius, and diverse lifting capacities. The engineering of these cranes encompasses a set of complex considerations including precise structural and fatigue analysis, crane stability during lifting and travel, design of the boom and hoisting and slewing mechanisms, design of elastic or flexible rail travel systems, and analysis of environmental conditions (wind and storm). The design of electrical and hydraulic systems, motion control, load management, and safety equipment are also considered integrally with the mechanical and structural design. With an approach based on international standards, integrated engineering, and the real requirements of port operation, each crane is developed according to the capacity, working range, type of cargo, and operational conditions of the project.',
    descFa:
      'فیدار سازه بندار با داشتن تیمی متخصص و با تجربه در حوزه طراحی و ساخت جرثقیل‌های موبایل ساحلی (Harbour Mobile Cranes)، راهکارهایی برای بارگیری و تخلیه انواع کشتی و جابه‌جایی مواد و کانتینر ارائه می‌دهد.\n تجهیزاتی که ترکیبی از تحرک بالا، شعاع کاری گسترده و ظرفیت‌های متنوع باربرداری را در اختیار بهره‌بردار قرار می‌دهند. مهندسی این جرثقیل‌ها، مجموعه‌ای از ملاحظات پیچیده شامل تحلیل دقیق سازه و خستگی آن، پایداری جرثقیل در باربرداری و حرکت، طراحی بوم و مکانیزم‌های بالابری و گردان، طراحی سیستم حرکتی الاستیکی و یا ریلی منعطف و تحلیل شرایط محیطی (باد و طوفان) را در بر می‌گیرد. \n\nطراحی سیستم‌های الکتریکی و هیدرولیکی، کنترل حرکت، مدیریت بار و تجهیزات ایمنی نیز به صورت یکپارچه با ساختار مکانیکی و سازه‌ای در نظر گرفته می‌شوند.\n با رویکردی مبتنی بر استانداردهای بین‌المللی، مهندسی یکپارچه و الزامات واقعی بهره‌برداری بندری، هر جرثقیل متناسب با ظرفیت، دامنه کاری، نوع بار و شرایط عملیاتی پروژه توسعه می‌یابد.',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v',
  },
  {
    id: 3,
    slugEn: 'bulk-material-loading-and-unloading-equipment',
    slugFa: 'تجهیزات-تخلیه-و-بارگیری-مواد-فله',
    nameEn: 'Bulk Material Loading and Unloading Equipment',
    nameFa: 'تجهیزات تخلیه و بارگیری مواد فله',
    color: '',
    slides: [],

    descEn:
      'Fidar Sazeh Bandar offers engineering solutions and specialized equipment for unloading, transferring, and loading bulk materials in ports and industrial terminals; from mechanized handling and loading equipment to transfer and unloading systems suited to the type and characteristics of various grains, minerals, and petrochemical bulk materials. The engineering of this equipment requires a precise understanding of material behavior, capacity and flow rate, loading and environmental conditions. Structural and mechanism design, static and dynamic calculations, selection of transfer systems, sealing and dust control, material flow management, and design of transfer points are all a set of technical considerations that directly affect system capacity, durability, and efficiency. This equipment is designed based on the type and granulometry of the material, density and flow behavior, operational capacity, dock conditions, and operation pattern, and is developed in the form of an integrated engineering and manufacturing solution with an approach of compliance with valid and up-to-date international standards as well as relevant safety and operational requirements.',
    descFa:
      'فیدار سازه بندار راهکارهای مهندسی و تجهیزات تخصصی برای تخلیه، انتقال و بارگیری مواد فله در بنادر و پایانه‌های صنعتی ارائه می‌دهد؛ از تجهیزات جابه‌جایی و بارگیری مکانیزه تا سامانه‌های انتقال و تخلیه‌ای متناسب با نوع و ویژگی‌های انواع غلات، مواد معدنی و پتروشیمی فله.\n مهندسی این تجهیزات نیازمند درک دقیق رفتار مواد، ظرفیت و نرخ جریان، شرایط بارگذاری و محیطی است.\n طراحی سازه و مکانیزم‌ها، محاسبات استاتیکی و دینامیکی، انتخاب سیستم‌های انتقال، آب‌بندی و کنترل گردوغبار، مدیریت جریان مواد و طراحی نقاط انتقال، همگی مجموعه‌ای از ملاحظات فنی هستند که مستقیماً بر ظرفیت، دوام و راندمان سیستم می‌گذارند. این تجهیزات بر اساس نوع و دانه‌بندی ماده، چگالی و رفتار جریان، ظرفیت عملیاتی، شرایط اسکله و الگوی بهره‌برداری طراحی می‌شوند و با رویکرد انطباق با استانداردهای معتبر و به‌روز بین‌المللی و همچنین الزامات ایمنی و عملیاتی مرتبط، در قالب یک راهکار یکپارچه مهندسی و ساخت توسعه می‌یابند.',
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v',
  },
];


export const SERVICES: MaterialData[] = [
  {
    id: 0,
    slugEn: 'port-equipment-maintenance-support',
    slugFa: 'خدمات-تعمیرات-نگهداری-پشتیبانی-تجهیزات-بندری',
    nameEn: 'Port Equipment Maintenance, Repair & Support Services',
    nameFa: 'خدمات تعمیرات، نگهداری و پشتیبانی تجهیزات بندری',
    color: 'var(--color-wood)',
    descEn:
      'Round-the-clock, continuous support for port equipment; from operation and preventive maintenance to troubleshooting, repairs, and technical support, aimed at maximizing availability, reducing downtime, and ensuring operational continuity.',
    descFa:
      'پشتیبانی شبانه‌روزی و مستمر از تجهیزات بندری؛ از بهره‌برداری و نگهداری پیشگیرانه تا عیب‌یابی، تعمیرات و ارائه پشتیبانی فنی، با هدف حداکثر دسترس‌پذیری، کاهش توقفات و تداوم عملیات.',
    slides: [
      {
        nameEn: '',
        nameFa: '',
        descEn: '',
        descFa: '',
        imgUrl: '/assets/images/icona_metal.png',
      }
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-1.webp',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  },

  {
    id: 1,
    slugEn: 'port-equipment-redesign-upgrade',
    slugFa: 'بازطراحی-و-به-روزرسانی-تجهیزات-بندرگاهی',
    nameEn: 'Redesign & Upgrade of Port Equipment',
    nameFa: 'بازطراحی و به‌روزرسانی تجهیزات بندرگاهی',
    color: 'var(--color-wood)',
    descEn:
      'Leveraging its engineering capabilities and executive experience, Fidar Sazeh Bandar provides analysis, redesign, renovation, and upgrading services for port equipment, covering structures and mechanics as well as electrical and control systems.',
    descFa:
      'فیدارسازه بندر با تکیه بر توان مهندسی و تجربه اجرایی، خدمات تحلیل، بازطراحی، نوسازی و ارتقای تجهیزات بندرگاهی را از سازه و مکانیک تا سیستم‌های الکتریکی و کنترل ارائه می‌دهد.',
    slides: [
      {
        nameEn: '',
        nameFa: '',
        descEn: '',
        descFa: '',
        imgUrl: '/assets/images/icona_metal.png',
      }
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-2.webp',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  },

  {
    id: 2,
    slugEn: 'specialized-repair-marine-vessels-structures',
    slugFa: 'تعمیرات-تخصصی-انواع-شناور-و-سازه-های-دریایی',
    nameEn: 'Specialized Repair of Marine Vessels & Structures',
    nameFa: 'تعمیرات تخصصی انواع شناور و سازه‌های دریایی',
    color: 'var(--color-wood)',
    descEn:
      'Repair, restoration, and strengthening of marine structures and equipment through engineering assessment, precise execution, and quality control, with the aim of restoring performance and ensuring a fast and reliable return to operation.',
    descFa:
      'تعمیر، بازسازی و تقویت سازه‌ها و تجهیزات دریایی با تکیه بر ارزیابی مهندسی، اجرای دقیق و کنترل کیفیت؛ با هدف احیای عملکرد و بازگشت سریع و مطمئن به بهره‌برداری.',
    slides: [
      {
        nameEn: '',
        nameFa: '',
        descEn: '',
        descFa: '',
        imgUrl: '/assets/images/icona_metal.png',
      }
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/services/4294-3.webp',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  }
];

export const SERVICES_DETAILS: MaterialData[] = [
  {
    id: 0,
    slugEn: 'port-equipment-maintenance-support',
    slugFa: 'خدمات-تعمیرات-نگهداری-پشتیبانی-تجهیزات-بندری',
    nameEn: 'Port Equipment Maintenance, Repair & Support Services',
    nameFa: 'خدمات تعمیرات، نگهداری و پشتیبانی تجهیزات بندری',
    color: 'var(--color-wood)',
    descEn:
      'Specialized repair, maintenance, and support services for port equipment, aimed at maximizing availability and ensuring uninterrupted operational continuity. Leveraging a specialized technical team and hands-on experience in port and marine equipment, these services cover everything from troubleshooting and specialized repairs to preventive maintenance, emergency breakdown response, and technical support. Fast and continuous 24/7 support, immediate response to emergency conditions, and a focus on reducing equipment downtime are among our key commitments in delivering these services.',
    descFa:
      'تعمیرات، نگهداری و پشتیبانی تخصصی تجهیزات بندری، با هدف حفظ حداکثری آماده‌به‌کاری و تداوم بدون وقفه عملیات. این خدمات با بهره‌گیری از تیم فنی متخصص و تجربه عملی در حوزه تجهیزات بندری و دریایی، از عیب‌یابی و تعمیرات تخصصی تا نگهداری پیشگیرانه، رفع اضطراری خرابی‌ها و تأمین پشتیبانی فنی را پوشش می‌دهد. پشتیبانی سریع و مستمر، پاسخ‌گویی فوری ۲۴/۷ به شرایط اضطراری و تمرکز بر کاهش زمان توقف تجهیزات، از مهم‌ترین تعهدات ما در ارائه خدمات است.',
      slides: [
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-2.webp',
        },
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-3.webp',
        },
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-4.webp',
        },
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-5.webp',
        },
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-1.webp',
        },
        {
          nameEn: '',
          nameFa: '',
          descEn: '',
          descFa: '',
          imgUrl: '/assets/images/services/4294-4.webp',
        },
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  },

  {
    id: 1,
    slugEn: 'port-equipment-redesign-upgrade',
    slugFa: 'بازطراحی-و-به-روزرسانی-تجهیزات-بندرگاهی',
    nameEn: 'Redesign & Upgrade of Port Equipment',
    nameFa: 'بازطراحی و به‌روزرسانی تجهیزات بندرگاهی',
    color: 'var(--color-wood)',
    descEn:
      'Providing comprehensive solutions for upgrading, restoring, and modernizing port equipment, with the aim of extending service life, improving reliability, and returning worn-out, obsolete, or low-efficiency equipment to optimal operational performance. Our approach is based on precise assessment of each equipment’s condition, re-engineering, and designing a solution tailored to its real-world circumstances; from overhaul and major repairs of mechanical systems to renewal of electrical and power systems, drives, PLC and HMI, control and automation, protection and safety systems, and providing up-to-date replacements for obsolete systems.\nIn designing and replacing systems, we do not consider only today’s performance of the equipment; readiness for future requirements and technologies is also taken into account. Improving the efficiency of electrical systems and drives, optimizing energy consumption, intelligent power management, monitoring and data-collection capability, and creating a suitable infrastructure for automation development, remote monitoring, and the solutions required by mechanized and smart ports are all part of our approach to equipment modernization engineering. Our goal is not merely to restore a piece of equipment; it is to re-engineer its life cycle and transform it into a reliable, scalable, and forward-looking operational platform. This approach, while enhancing reliability, safety, availability, and maintainability of the equipment, prevents full replacement of equipment in unnecessary cases and, by reducing the Total Cost of Ownership (TCO), optimizes the required investment.\nBy combining operational experience, engineering knowledge, and deep familiarity with port equipment, we transform idle assets and worn-out equipment into up-to-date, flexible assets ready for the new generation of port operations; equipment that not only delivers reliable performance today but will also have the capacity for development and adaptation for the future needs of ports.',
    descFa:
      'ارائه راهکارهای جامع به‌روزرسانی، بازسازی و مدرن‌سازی تجهیزات بندری با هدف افزایش عمر مفید، ارتقای قابلیت اطمینان و بازگرداندن تجهیزات فرسوده، از رده خارج یا کم‌بازده به سطح مطلوب عملکرد عملیاتی. رویکرد ما بر پایه ارزیابی دقیق وضعیت تجهیز، مهندسی مجدد و طراحی راهکار متناسب با شرایط واقعی هر تجهیز است؛ از بازسازی و تعمیرات اساسی سیستم‌های مکانیکی تا نوسازی سیستم‌های الکتریکی و قدرت، درایوها، PLC و HMI، کنترل و اتوماسیون، سیستم‌های حفاظتی و ایمنی و ارائه‌ی جایگزین به‌روز برای سیستم‌های منسوخ.\nدر طراحی و جایگزینی سیستم‌ها، صرفاً عملکرد امروز تجهیز مدنظر نیست؛ بلکه آمادگی برای الزامات و فناوری‌های آینده نیز در نظر گرفته می‌شود. ارتقای راندمان سیستم‌های الکتریکی و درایوها، بهینه‌سازی مصرف انرژی، مدیریت هوشمند توان، قابلیت پایش و جمع‌آوری داده، و ایجاد زیرساخت مناسب برای توسعه اتوماسیون، Remote Monitoring و راهکارهای موردنیاز بنادر مکانیزه و هوشمند، بخشی از رویکرد ما در مهندسی نوسازی تجهیزات است. هدف ما صرفاً بازسازی یک تجهیز نیست؛ بلکه مهندسی مجدد چرخه عمر تجهیز و تبدیل آن به یک پلتفرم عملیاتی قابل اتکا، قابل توسعه و آینده‌نگر است. این رویکرد، ضمن افزایش قابلیت اطمینان، ایمنی تجهیز، دسترس‌پذیری و تعمیرپذیری، از جایگزینی کامل تجهیزات در موارد غیرضروری جلوگیری کرده و با کاهش هزینه تجمیعی تجهیز (Total Cost of Ownership – TCO)، سرمایه‌گذاری موردنیاز را بهینه می‌کند.\nما با ترکیب تجربه عملیاتی، دانش مهندسی و شناخت عمیق از تجهیزات بندری، سرمایه‌های راکد و تجهیزات فرسوده را به دارایی‌هایی به‌روز، انعطاف‌پذیر و آماده ورود به نسل جدید عملیات بندری تبدیل می‌کنیم؛ تجهیزاتی که نه تنها امروز عملکردی قابل اتکا دارند، بلکه برای نیازهای فردای بنادر نیز ظرفیت توسعه و تطبیق خواهند داشت.',
    slides: [
      {
        nameEn: '',
        nameFa: '',
        descEn: '',
        descFa: '',
        imgUrl: '/assets/images/services/4294-0.webp',
      }
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  },

  {
    id: 2,
    slugEn: 'specialized-repair-marine-vessels-structures',
    slugFa: 'تعمیرات-تخصصی-انواع-شناور-و-سازه-های-دریایی',
    nameEn: 'Specialized Repair of Marine Vessels & Structures',
    nameFa: 'تعمیرات تخصصی انواع شناور و سازه‌های دریایی',
    color: 'var(--color-wood)',
    descEn:
      'From structural repairs, correction and strengthening of worn components to the restoration and renewal of mechanical, hydraulic, and electrical systems and auxiliary equipment, Fidar Sazeh Bandar offers a comprehensive range of specialized repair and restoration services for ships, vessels, and marine structures.\nLeveraging engineering knowledge, operational experience, and an approach based on precise technical assessment, the repair process is carried out under full control—from inspection, damage identification, and analysis of the current condition to designing the engineering solution, procuring equipment, and executing repair operations.\nOur goal is to extend the useful life of marine assets, restore safe and stable performance of equipment, and reduce costs caused by prolonged downtime. Our services, with a focus on execution quality, compliance with technical standards, and minimizing out-of-service time, are designed to prepare vessels and marine structures for continued safe and efficient operation.\nRelying on its engineering capabilities and execution capacities, Fidar Sazeh Bandar is a trusted partner of the marine industry on the path to modernization, improved reliability, and increased productivity of marine equipment and infrastructure.',
    descFa:
      'از تعمیرات سازه‌ای، اصلاح و تقویت اجزای فرسوده تا بازسازی و نوسازی سیستم‌های مکانیکی، هیدرولیکی، الکتریکی و تجهیزات جانبی، فیدارسازه بندار مجموعه‌ای جامع از خدمات تخصصی تعمیر و احیای کشتی‌ها، شناورها و سازه‌های دریایی را ارائه می‌دهد.\nبا بهره‌گیری از دانش مهندسی، تجربه عملیاتی و رویکرد مبتنی بر ارزیابی فنی دقیق، فرآیند تعمیرات از مرحله بازرسی، شناسایی آسیب‌ها و تحلیل وضعیت موجود تا طراحی راهکار مهندسی، تأمین تجهیزات و اجرای عملیات تعمیراتی تحت کنترل کامل انجام می‌شود.\nهدف ما افزایش عمر مفید دارایی‌های دریایی، بازگرداندن عملکرد ایمن و پایدار تجهیزات و کاهش هزینه‌های ناشی از توقف‌های طولانی‌مدت است. خدمات ما با تمرکز بر کیفیت اجرا، رعایت استانداردهای فنی و حداقل‌سازی زمان خروج از سرویس، به گونه‌ای طراحی شده‌اند که شناورها و سازه‌های دریایی را برای ادامه بهره‌برداری مطمئن و کارآمد آماده سازند.\nفیدارسازه بندار با تکیه بر توان مهندسی و ظرفیت‌های اجرایی خود، شریک قابل اعتماد صنایع دریایی در مسیر نوسازی، ارتقای قابلیت اطمینان و افزایش بهره‌وری تجهیزات و زیرساخت‌های دریایی است.',
    slides: [
      {
        nameEn: '',
        nameFa: '',
        descEn: '',
        descFa: '',
        imgUrl: '/assets/images/services/4294-4.webp',
      }
    ],
    btnEn: 'Read More',
    btnFa: 'اطلاعات بیشتر',
    imgUrl: '/assets/images/test-GLASS-icon-2.png',
    videoUrl: '/assets/videos/Sito_-_Banner_Wood_-_Strip.m4v'
  }
];