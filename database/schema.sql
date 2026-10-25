-- ========================================================
-- BIESSs DIGITAL BILINGUAL PHP & MYSQL DATABASE SCHEMA
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- Optimized for Persian & English Content + SEO Metadata
-- ========================================================

CREATE DATABASE IF NOT EXISTS `fidar_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `fidar_db`;

-- --------------------------------------------------------
-- Table: `posts` (Unified Blog & News for Next.js API)
-- Uses a `post_type` column to differentiate articles vs news
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `posts` (
  `id` VARCHAR(100) PRIMARY KEY,
  `post_type` ENUM('article', 'news') NOT NULL DEFAULT 'article',
  `status` ENUM('published', 'draft', 'unpublished') NOT NULL DEFAULT 'published',
  `slug_fa` VARCHAR(255) NOT NULL,
  `slug_en` VARCHAR(255) NOT NULL,
  `title_fa` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `excerpt_fa` TEXT,
  `excerpt_en` TEXT,
  `content_fa` LONGTEXT,
  `content_en` LONGTEXT,
  `author_fa` VARCHAR(100) DEFAULT 'تیم فنی فیدار بندار',
  `author_en` VARCHAR(100) DEFAULT 'Biesss Engineering',
  `date` DATE NOT NULL,
  `read_time` VARCHAR(50) DEFAULT '5 min',
  `category_fa` VARCHAR(100) DEFAULT 'مقالات تخصصی',
  `category_en` VARCHAR(100) DEFAULT 'Technical Articles',
  `cover_image` VARCHAR(500),
  `seo_title_fa` VARCHAR(255),
  `seo_title_en` VARCHAR(255),
  `seo_desc_fa` TEXT,
  `seo_desc_en` TEXT,
  `seo_keywords_fa` VARCHAR(500),
  `seo_keywords_en` VARCHAR(500),
  `views` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_slug_fa` (`slug_fa`),
  INDEX `idx_slug_en` (`slug_en`),
  INDEX `idx_post_type` (`post_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: `contact_messages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `company` VARCHAR(150),
  `service` VARCHAR(100),
  `budget` VARCHAR(100),
  `message` TEXT NOT NULL,
  `lang` ENUM('fa', 'en') DEFAULT 'fa',
  `status` ENUM('new', 'contacted', 'resolved') DEFAULT 'new',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: `seo_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `site_title_fa` VARCHAR(255) NOT NULL,
  `site_title_en` VARCHAR(255) NOT NULL,
  `meta_desc_fa` TEXT NOT NULL,
  `meta_desc_en` TEXT NOT NULL,
  `keywords_fa` VARCHAR(500),
  `keywords_en` VARCHAR(500),
  `og_image` VARCHAR(500),
  `canonical_url` VARCHAR(255) NOT NULL,
  `twitter_handle` VARCHAR(100),
  `indexing_enabled` TINYINT(1) DEFAULT 1,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- SEED DATA
-- ========================================================

-- Seed SEO Settings
INSERT INTO `seo_settings` (`site_title_fa`, `site_title_en`, `meta_desc_fa`, `meta_desc_en`, `canonical_url`, `og_image`, `twitter_handle`)
VALUES (
  'گروه دیجیتالفیدار بندار| طراحی سایت PHP دوزبانه و سئوی تخصصی',
  'Biesss Digital | Custom Bilingual PHP & MySQL Web Engineering & SEO',
  'توسعه سیستم‌های وب اختصاصی با PHP 8 و MySQL، معماری دوزبانه (فارسی/انگلیسی)، سئوی پیشرفته، سرعت فوق‌العاده و پنل مدیریت کامل.',
  'Enterprise bilingual PHP 8 & MySQL web development studio with organic search SEO optimization, dark tech styling & exportable code.',
  'https://fidarbondar.com',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  '@BiesssDigital'
);

-- Seed Sample Articles (all published by default)
INSERT INTO `posts` (`id`, `post_type`, `status`, `slug_fa`, `slug_en`, `title_fa`, `title_en`, `excerpt_fa`, `excerpt_en`, `content_fa`, `content_en`, `author_fa`, `author_en`, `date`, `read_time`, `category_fa`, `category_en`, `cover_image`, `seo_title_fa`, `seo_title_en`, `seo_desc_fa`, `seo_desc_en`, `seo_keywords_fa`, `seo_keywords_en`, `views`) VALUES
('art-1', 'article', 'published', 'آموزش-طراحی-سایت-دوزبانه-با-php-و-mysql', 'building-bilingual-php-mysql-website-guide', 'راهنمای جامع ساخت وب‌سایت دوزبانه با PHP 8 و MySQL (اصول سئو و RTL)', 'Comprehensive Guide: Building a Bilingual PHP 8 & MySQL Website for SEO', 'بررسی معماری دیتابیس MySQL، مدیریت زبان‌ها با PHP، تنظیمات hreflang و استانداردهای طراحی RTL جهت کسب رتبه‌های گوگل.', 'Explore MySQL table architecture, language handling in PHP, hreflang meta configuration, and RTL visual principles.', 'طراحی و پیاده‌سازی وب‌سایت دوزبانه...', 'Engineering a bilingual web application...', 'تیم فنی فیدار سازه بندار', 'Biesss Engineering Team', '2026-07-28', '6 min read', 'توسعه وب و سئو', 'Web Dev & SEO', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 'راهنمای ساخت سایت دوزبانه PHP و MySQL |فیدار بنداردیجیتال', 'Building Bilingual PHP & MySQL Web Apps Guide | Biesss', 'آموزش کامل پیاده‌سازی سایت دوزبانه با PHP 8، ساختار جداول MySQL، سئو چندزبانه و تگ‌های hreflang.', 'Complete developer guide for building high-performance bilingual PHP & MySQL websites with technical SEO.', 'سایت دوزبانه PHP, دیتابیس MySQL چندزبانه, سئو سایت چندزبانه, طراحی سایت فیدار بندار', 'Bilingual PHP website, MySQL multi-language schema, Technical SEO hreflang, Biesss digital group', 1420),
('art-2', 'article', 'published', 'اصول-سئو-تکنیکال-در-کدنویسی-php', 'technical-seo-best-practices-in-php', '۱۰ اصل سئوی تکنیکال در توسعه سایت‌های PHP برای رسیدن به لینک یک گوگل', '10 Crucial Technical SEO Best Practices for PHP Web Applications', 'نحوه مدیریت ریدایرکت‌ها، سرعت Core Web Vitals، کشینگ در PHP، کئوری‌های بهینه‌شده MySQL و ساختار URLs.', 'Mastering HTTP response codes, query optimizations, dynamic sitemaps, and Core Web Vitals in custom PHP.', 'سرعت و سئوی تکنیکال دو رکن جدایی‌ناپذیر...', 'Speed and technical SEO are the foundation...', 'واحد سئوی فیدار بندار', 'Biesss SEO Specialists', '2026-07-20', '8 min read', 'سئو تکنیکال', 'Technical SEO', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80', 'اصول سئوی تکنیکال در کدنویسی PHP | وبلاگ بیس', 'Technical SEO Best Practices in PHP | Biesss Blog', 'راهکارهای عملی افزایش سرعت و سئوی تکنیکال در پروژه‌های PHP اختصاصی و دیتابیس MySQL.', 'Actionable technical SEO practices for custom PHP and MySQL database driven web platforms.', 'سئو تکنیکال PHP, سرعت دیتابیس MySQL, تولید sitemap.xml, بهینه‌سازی وب', 'PHP technical SEO, MySQL performance optimization, Dynamic XML sitemap PHP, Core Web Vitals', 980),
('news-1', 'news', 'published', 'رونمایی-فیدار بندار-از-نسل-جدید-موتورهای-دیجیتال', 'Fidar Bondar-unveils-new-generation-digital-engine', 'رونمایی گروه فیدار بندار از نسل جدید سیستم مدیریت محتوای PHP 8 و پردازش چندزبانه', 'Fidar Bondar Group Unveils Next-Generation PHP 8 & Multilingual Digital Platform', 'گروه صنعتی و دیجیتال فیدار بندار از جدیدترین فناوری هماهنگ‌سازی دیتابیس MySQL و موتور وب‌سایت‌های بین‌المللی رونمایی کرد.', 'Fidar Bondar Group launches state-of-the-art PHP 8 web architecture integrated with real-time MySQL database synchronization.', 'گروه فیدار بندار به عنوان یکی از پیشگامان صنعت...', 'Fidar Bondar Group, a global leader in industrial technology...', 'روابط عمومی فیدار بندار', 'Fidar Bondar Press Office', '2026-08-01', '3 min read', 'اخبار و اطلاعیه‌ها', 'News & Announcements', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', 'اخبار رسمی گروه فیدار بندار | رونمایی از پلتفرم جدید PHP', 'Fidar Bondar Group Official News | PHP Platform Launch', 'جدیدترین اخبار و اطلاعیه‌های رسمی گروه صنعتی و دیجیتال فیدار بندار درباره تکنولوژی‌های وب و دیتابیس.', 'Official news and press releases from Fidar Bondar Group regarding web technology and database innovations.', 'اخبار فیدار بندار, تکنولوژی PHP 8, اطلاعیه دیتابیس, فیدار سازه بندار', 'Fidar Bondar news, PHP 8 technology, Database announcement, Fidar Bondar Digital', 2150);
