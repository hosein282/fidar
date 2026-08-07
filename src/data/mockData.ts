import { ServiceItem, PortfolioProject, BlogPost, SEOMetaConfig, EstimatorFeature } from '../types';

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
      fa: 'تیم فنی بیس (Biesss Digital) پلتفرم‌های PHP اختصاصی و بدون وابستگی سنگین ارائه می‌دهد. کدهای تمیز، لایه‌های امنیتی در برابر SQL Injection و XSS، سیستم‌های کشینگ Redis/Memcached و ساختار مقیاس‌پذیر برای ترافیک‌های سنگین.',
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
      fa: 'پلتفرم سازمانی بیئس دیجیتال',
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
<link rel="alternate" hreflang="fa" href="https://example.com/fa/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="canonical" href="https://example.com/fa/page" />
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
<link rel="alternate" hreflang="fa" href="https://example.com/fa/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="canonical" href="https://example.com/en/page" />
\`\`\`

### 3. Directional Layouts (RTL vs LTR)
By updating the HTML root attribute dynamically (\`<html dir="rtl" lang="fa">\` for Persian and \`<html dir="ltr" lang="en">\` for English), font families and layout grids adapt instantly.`
    },
    author: {
      fa: 'تیم فنی بیس دیجیتال',
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
      fa: 'راهنمای ساخت سایت دوزبانه PHP و MySQL | بیس دیجیتال',
      en: 'Building Bilingual PHP & MySQL Web Apps Guide | Biesss'
    },
    seoDescription: {
      fa: 'آموزش کامل پیاده‌سازی سایت دوزبانه با PHP 8، ساختار جداول MySQL، سئو چندزبانه و تگ‌های hreflang.',
      en: 'Complete developer guide for building high-performance bilingual PHP & MySQL websites with technical SEO.'
    },
    seoKeywords: {
      fa: ['سایت دوزبانه PHP', 'دیتابیس MySQL چندزبانه', 'سئو سایت چندزبانه', 'طراحی سایت بیئس'],
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
      fa: 'واحد سئوی بیئس',
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
      fa: 'رونمایی-بیئس-از-نسل-جدید-موتورهای-دیجیتال',
      en: 'biesse-unveils-new-generation-digital-engine'
    },
    title: {
      fa: 'رونمایی گروه بیئس از نسل جدید سیستم مدیریت محتوای PHP 8 و پردازش چندزبانه',
      en: 'Biesse Group Unveils Next-Generation PHP 8 & Multilingual Digital Platform'
    },
    excerpt: {
      fa: 'گروه صنعتی و دیجیتال بیئس از جدیدترین فناوری هماهنگ‌سازی دیتابیس MySQL و موتور وب‌سایت‌های بین‌المللی رونمایی کرد.',
      en: 'Biesse Group launches state-of-the-art PHP 8 web architecture integrated with real-time MySQL database synchronization.'
    },
    content: {
      fa: `گروه بیئس به عنوان یکی از پیشگامان صنعت و فناوری دیجیتال، از نسخه جدید پلتفرم دیجیتال خود رونمایی کرد. این پلتفرم با تکیه بر هسته PHP 8 و دیتابیس بهینه‌شده MySQL، سرعت بارگذاری صفحات را تا ۶۰٪ افزایش داده است.

همچنین قابلیت مدیریت اخبار و مقالات به صورت جداگانه در دیتابیس، امکان اطلاع‌رسانی دقیق و به‌روزرسانی محتوایی سریع را برای مدیران فراهم کرده است.`,
      en: `Biesse Group, a global leader in industrial technology and digital solutions, announces its updated enterprise web suite. Built on PHP 8 and MySQL, the system reduces latency by 60%.

The new architecture includes dedicated database schemas for press releases, news, and technical articles.`
    },
    author: {
      fa: 'روابط عمومی بیئس',
      en: 'Biesse Press Office'
    },
    date: '2026-08-01',
    readTime: '3 min read',
    category: {
      fa: 'اخبار و اطلاعیه‌ها',
      en: 'News & Announcements'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    seoTitle: {
      fa: 'اخبار رسمی گروه بیئس | رونمایی از پلتفرم جدید PHP',
      en: 'Biesse Group Official News | PHP Platform Launch'
    },
    seoDescription: {
      fa: 'جدیدترین اخبار و اطلاعیه‌های رسمی گروه صنعتی و دیجیتال بیئس درباره تکنولوژی‌های وب و دیتابیس.',
      en: 'Official news and press releases from Biesse Group regarding web technology and database innovations.'
    },
    seoKeywords: {
      fa: ['اخبار بیئس', 'تکنولوژی PHP 8', 'اطلاعیه دیتابیس', 'بیئس دیجیتال'],
      en: ['Biesse news', 'PHP 8 technology', 'Database announcement', 'Biesse Digital']
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
    fa: 'گروه دیجیتال بیس | طراحی سایت PHP دوزبانه و سئوی تخصصی (مشابه Biesss.com)',
    en: 'Biesss Digital | Custom Bilingual PHP & MySQL Web Engineering & SEO'
  },
  metaDescription: {
    fa: 'توسعه سیستم‌های وب اختصاصی با PHP 8 و MySQL، معماری دوزبانه (فارسی/انگلیسی)، سئوی پیشرفته، سرعت فوق‌العاده و پنل مدیریت کامل.',
    en: 'Enterprise bilingual PHP 8 & MySQL web development studio with organic search SEO optimization, dark tech styling & exportable code.'
  },
  keywords: {
    fa: ['طراحی سایت biesss', 'سایت PHP و MySQL', 'طراحی سایت دوزبانه', 'سئوی تخصصی گوگل', 'کد PHP آماده سایت شرکتی'],
    en: ['biesss style website', 'PHP MySQL web dev', 'Bilingual website development', 'Enterprise SEO agency', 'PHP source code generator']
  },
  
  ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  canonicalUrl: 'https://biesss.example.com',
  twitterHandle: '@BiesssDigital',
  indexingEnabled: true,
  structuredDataSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Biesss Digital Studio',
    'url': 'https://biesss.example.com',
    'logo': 'https://biesss.example.com/logo.png',
    'sameAs': [
      'https://linkedin.com/company/biesss',
      'https://twitter.com/BiesssDigital'
    ],
    'knowsLanguage': ['fa', 'en'],
    'description': 'High-performance bilingual web engineering with PHP 8 & MySQL.'
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
