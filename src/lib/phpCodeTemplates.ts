import { GeneratedPHPFile } from '../types';

export function generatePHPProjectFiles(): GeneratedPHPFile[] {
  const sqlSchema = `-- ========================================================
-- BIESSs DIGITAL BILINGUAL PHP & MYSQL DATABASE SCHEMA
-- Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
-- Optimized for Persian & English Content + SEO Metadata
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`biesss_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`biesss_db\`;

-- --------------------------------------------------------
-- Table: \`services\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`slug\` VARCHAR(100) NOT NULL UNIQUE,
  \`icon\` VARCHAR(50) DEFAULT 'Code2',
  \`title_fa\` VARCHAR(255) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`short_desc_fa\` TEXT NOT NULL,
  \`short_desc_en\` TEXT NOT NULL,
  \`full_desc_fa\` LONGTEXT,
  \`full_desc_en\` LONGTEXT,
  \`features_json\` JSON,
  \`tech_stack\` VARCHAR(255),
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`portfolio\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`portfolio\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`category\` VARCHAR(50) NOT NULL,
  \`title_fa\` VARCHAR(255) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`client_fa\` VARCHAR(255),
  \`client_en\` VARCHAR(255),
  \`image_url\` VARCHAR(500),
  \`summary_fa\` TEXT,
  \`summary_en\` TEXT,
  \`challenge_fa\` TEXT,
  \`challenge_en\` TEXT,
  \`solution_fa\` TEXT,
  \`solution_en\` TEXT,
  \`metrics_json\` JSON,
  \`tech_stack\` VARCHAR(255),
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`articles\` (Technical Articles)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`articles\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`post_id\` VARCHAR(100) NOT NULL UNIQUE,
  \`slug_fa\` VARCHAR(255) NOT NULL,
  \`slug_en\` VARCHAR(255) NOT NULL,
  \`title_fa\` VARCHAR(255) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`excerpt_fa\` TEXT,
  \`excerpt_en\` TEXT,
  \`content_fa\` LONGTEXT,
  \`content_en\` LONGTEXT,
  \`author_fa\` VARCHAR(100) DEFAULT 'تیم فنی فیدار بندار',
  \`author_en\` VARCHAR(100) DEFAULT 'Biesss Engineering',
  \`cover_image\` VARCHAR(500),
  \`read_time\` VARCHAR(50) DEFAULT '5 min',
  \`category_fa\` VARCHAR(100) DEFAULT 'مقالات تخصصی',
  \`category_en\` VARCHAR(100) DEFAULT 'Technical Articles',
  \`meta_title_fa\` VARCHAR(255),
  \`meta_title_en\` VARCHAR(255),
  \`meta_desc_fa\` TEXT,
  \`meta_desc_en\` TEXT,
  \`keywords_fa\` VARCHAR(255),
  \`keywords_en\` VARCHAR(255),
  \`views\` INT DEFAULT 0,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_art_slug_fa\` (\`slug_fa\`),
  INDEX \`idx_art_slug_en\` (\`slug_en\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`news\` (Company & Tech News)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`news\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`post_id\` VARCHAR(100) NOT NULL UNIQUE,
  \`slug_fa\` VARCHAR(255) NOT NULL,
  \`slug_en\` VARCHAR(255) NOT NULL,
  \`title_fa\` VARCHAR(255) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`excerpt_fa\` TEXT,
  \`excerpt_en\` TEXT,
  \`content_fa\` LONGTEXT,
  \`content_en\` LONGTEXT,
  \`author_fa\` VARCHAR(100) DEFAULT 'روابط عمومی فیدار بندار',
  \`author_en\` VARCHAR(100) DEFAULT 'Fidar Bondar Press Team',
  \`cover_image\` VARCHAR(500),
  \`read_time\` VARCHAR(50) DEFAULT '3 min',
  \`category_fa\` VARCHAR(100) DEFAULT 'اخبار و اطلاعیه‌ها',
  \`category_en\` VARCHAR(100) DEFAULT 'News & Announcements',
  \`meta_title_fa\` VARCHAR(255),
  \`meta_title_en\` VARCHAR(255),
  \`meta_desc_fa\` TEXT,
  \`meta_desc_en\` TEXT,
  \`keywords_fa\` VARCHAR(255),
  \`keywords_en\` VARCHAR(255),
  \`views\` INT DEFAULT 0,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_news_slug_fa\` (\`slug_fa\`),
  INDEX \`idx_news_slug_en\` (\`slug_en\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`posts\` (Blog & Articles for SEO)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`posts\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`slug_fa\` VARCHAR(255) NOT NULL UNIQUE,
  \`slug_en\` VARCHAR(255) NOT NULL UNIQUE,
  \`title_fa\` VARCHAR(255) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`excerpt_fa\` TEXT,
  \`excerpt_en\` TEXT,
  \`content_fa\` LONGTEXT NOT NULL,
  \`content_en\` LONGTEXT NOT NULL,
  \`author_fa\` VARCHAR(100) DEFAULT 'فیدار سازه بندار',
  \`author_en\` VARCHAR(100) DEFAULT 'Biesss Digital',
  \`cover_image\` VARCHAR(500),
  \`read_time\` VARCHAR(50) DEFAULT '5 min',
  \`category_fa\` VARCHAR(100),
  \`category_en\` VARCHAR(100),
  \`meta_title_fa\` VARCHAR(255),
  \`meta_title_en\` VARCHAR(255),
  \`meta_desc_fa\` TEXT,
  \`meta_desc_en\` TEXT,
  \`views\` INT DEFAULT 0,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_slug_fa\` (\`slug_fa\`),
  INDEX \`idx_slug_en\` (\`slug_en\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`contact_messages\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`contact_messages\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`phone\` VARCHAR(30) NOT NULL,
  \`company\` VARCHAR(150),
  \`service\` VARCHAR(100),
  \`budget\` VARCHAR(100),
  \`message\` TEXT NOT NULL,
  \`lang\` ENUM('fa', 'en') DEFAULT 'fa',
  \`status\` ENUM('new', 'read', 'archived') DEFAULT 'new',
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: \`seo_settings\`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`seo_settings\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`site_title_fa\` VARCHAR(255) NOT NULL,
  \`site_title_en\` VARCHAR(255) NOT NULL,
  \`meta_desc_fa\` TEXT NOT NULL,
  \`meta_desc_en\` TEXT NOT NULL,
  \`canonical_url\` VARCHAR(255) NOT NULL,
  \`og_image\` VARCHAR(500),
  \`twitter_handle\` VARCHAR(100),
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Sample SEO Settings
INSERT INTO \`seo_settings\` (\`site_title_fa\`, \`site_title_en\`, \`meta_desc_fa\`, \`meta_desc_en\`, \`canonical_url\`, \`og_image\`, \`twitter_handle\`)
VALUES (
  'گروه دیجیتالفیدار بندار| توسعه وب PHP دوزبانه و سئو',
  'Biesss Digital | Custom Bilingual PHP & MySQL Web Studio',
  'توسعه سیستم‌های وب اختصاصی با PHP 8 و MySQL، سئوی پیشرفته و معماری دوزبانه.',
  'Enterprise bilingual PHP 8 & MySQL web development studio with technical SEO.',
  'https://biesss.example.com',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  '@BiesssDigital'
);
`;

  const configPhp = `<?php
/**
 * Biesss Digital - Core Database Configuration & PDO Helper
 * PHP Version: 8.0+
 * Engine: MySQL / MariaDB PDO with UTF-8 support
 */

// Environment settings
define('DB_HOST', 'localhost');
define('DB_NAME', 'biesss_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

define('SITE_URL', 'http://localhost/biesss-site');
define('DEFAULT_LANG', 'fa');

// Session handling
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Current language detection (Query param > Cookie > Default)
if (isset($_GET['lang']) && in_array($_GET['lang'], ['fa', 'en'])) {
    $_SESSION['lang'] = $_GET['lang'];
    setcookie('lang', $_GET['lang'], time() + (86400 * 30), "/");
}

$lang = $_SESSION['lang'] ?? $_COOKIE['lang'] ?? DEFAULT_LANG;
$dir = ($lang === 'fa') ? 'rtl' : 'ltr';

// PDO Database Connection
function getDBConnection(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die("Database connection failed: " . htmlspecialchars($e->getMessage()));
        }
    }
    return $pdo;
}

// Security sanitization helper
function sanitizeInput(string $data): string {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}
?>`;

  const indexPhp = `<?php
require_once __DIR__ . '/config.php';

// Fetch SEO Meta Settings from MySQL
$db = getDBConnection();
$seoStmt = $db->query("SELECT * FROM seo_settings LIMIT 1");
$seo = $seoStmt->fetch() ?: [
    'site_title_fa' => 'فیدار سازه بندار',
    'site_title_en' => 'Biesss Digital',
    'meta_desc_fa'  => 'توسعه وب تخصصی PHP و MySQL',
    'meta_desc_en'  => 'Bilingual PHP & MySQL Engineering',
    'canonical_url' => SITE_URL
];

$pageTitle = ($lang === 'fa') ? $seo['site_title_fa'] : $seo['site_title_en'];
$metaDesc = ($lang === 'fa') ? $seo['meta_desc_fa'] : $seo['meta_desc_en'];

// Fetch Services from MySQL
$servicesStmt = $db->query("SELECT * FROM services ORDER BY id DESC LIMIT 6");
$services = $servicesStmt->fetchAll();

// Fetch Blog Posts from MySQL
$postsStmt = $db->query("SELECT * FROM posts ORDER BY id DESC LIMIT 3");
$posts = $postsStmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>" dir="<?= $dir ?>" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?></title>
    <meta name="description" content="<?= htmlspecialchars($metaDesc) ?>">
    
    <!-- Hreflang Tags for Search Engines -->
    <link rel="alternate" hreflang="fa" href="<?= SITE_URL ?>/?lang=fa" />
    <link rel="alternate" hreflang="en" href="<?= SITE_URL ?>/?lang=en" />
    <link rel="canonical" href="<?= SITE_URL ?>/?lang=<?= $lang ?>" />

    <!-- Open Graph Social Tags -->
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle) ?>" />
    <meta property="og:description" content="<?= htmlspecialchars($metaDesc) ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?= SITE_URL ?>" />

    <!-- Tailwind CSS CDN for presentation -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <style>
        body { font-family: 'Vazirmatn', system-ui, sans-serif; }
    </style>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen">

    <!-- Header & Language Switcher -->
    <header class="border-b border-slate-800 bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl">B</div>
                <span class="font-bold text-xl tracking-wide bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">BIESSS DIGITAL</span>
            </div>
            
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <a href="#services" class="hover:text-emerald-400 transition"><?= $lang === 'fa' ? 'خدمات ما' : 'Services' ?></a>
                <a href="#portfolio" class="hover:text-emerald-400 transition"><?= $lang === 'fa' ? 'نمونه کارها' : 'Portfolio' ?></a>
                <a href="#blog" class="hover:text-emerald-400 transition"><?= $lang === 'fa' ? 'وبلاگ و سئو' : 'Blog & SEO' ?></a>
                <a href="#contact" class="hover:text-emerald-400 transition"><?= $lang === 'fa' ? 'تماس با ما' : 'Contact' ?></a>
            </nav>

            <div class="flex items-center gap-4">
                <a href="?lang=<?= $lang === 'fa' ? 'en' : 'fa' ?>" class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    🌐 <?= $lang === 'fa' ? 'English (LTR)' : 'فارسی (RTL)' ?>
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-24 px-4 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>
        <div class="max-w-4xl mx-auto space-y-6">
            <span class="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                <?= $lang === 'fa' ? 'توسعه وب PHP 8 + دیتابیس MySQL + سئوی گوگل' : 'PHP 8 + MySQL + Google SEO Engineering' ?>
            </span>
            <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
                <?= $lang === 'fa' ? 'معماری وب اختصاصی، دو زبانه و شتاب سئو' : 'Bilingual Web Systems & Organic SEO Acceleration' ?>
            </h1>
            <p class="text-slate-400 text-lg max-w-2xl mx-auto">
                <?= $lang === 'fa' ? 'طراحی پلتفرم‌های پرسرعت با PHP و MySQL بدون سنگینی CMSها، آماده‌ی رتبه‌گیری در صفحه اول گوگل.' : 'High-performance bespoke PHP & MySQL platforms with native RTL/LTR bilingual support.' ?>
            </p>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-16 max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center"><?= $lang === 'fa' ? 'خدمات تخصصی' : 'Our Services' ?></h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <?php foreach ($services as $service): ?>
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition">
                    <h3 class="text-xl font-bold mb-2 text-emerald-400">
                        <?= htmlspecialchars($lang === 'fa' ? $service['title_fa'] : $service['title_en']) ?>
                    </h3>
                    <p class="text-slate-400 text-sm">
                        <?= htmlspecialchars($lang === 'fa' ? $service['short_desc_fa'] : $service['short_desc_en']) ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© <?= date('Y') ?> BIESSS DIGITAL. <?= $lang === 'fa' ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.' ?></p>
    </footer>

</body>
</html>`;

  const contactPhp = `<?php
require_once __DIR__ . '/config.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = sanitizeInput($_POST['name'] ?? '');
    $email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $phone   = sanitizeInput($_POST['phone'] ?? '');
    $company = sanitizeInput($_POST['company'] ?? '');
    $service = sanitizeInput($_POST['service'] ?? '');
    $budget  = sanitizeInput($_POST['budget'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    $formLang= sanitizeInput($_POST['lang'] ?? 'fa');

    if (!$name || !$email || !$message) {
        $response['message'] = ($formLang === 'fa') ? 'لطفا فیلدهای ضروری (نام، ایمیل و پیام) را تکمیل کنید.' : 'Please fill all required fields.';
    } else {
        try {
            $db = getDBConnection();
            $stmt = $db->prepare("INSERT INTO contact_messages (name, email, phone, company, service, budget, message, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $company, $service, $budget, $message, $formLang]);
            
            $response['success'] = true;
            $response['message'] = ($formLang === 'fa') ? 'پیام شما با موفقیت ثبت شد. تیمفیدار بنداردیجیتال به‌زودی با شما تماس خواهد گرفت.' : 'Your message has been submitted successfully.';
        } catch (PDOException $e) {
            $response['message'] = 'Database error: ' . htmlspecialchars($e->getMessage());
        }
    }
    
    // Header redirect or JSON output
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}
?>`;

  const htaccess = `# ========================================================
# Apache Mod_Rewrite configuration for Fidar & API Setup
# Biesss Digital - Dual Folder Setup (public_html/fidar & public_html/api)
# ========================================================

# 1. Main Root .htaccess (Place in: public_html/.htaccess)
# --------------------------------------------------------
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Stop directory listing
    Options -Indexes
    AddDefaultCharset UTF-8

    # Route API calls directly to /api/
    RewriteRule ^api/(.*)$ api/$1 [L,QSA]

    # Route main site calls to /fidar/
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteCond %{REQUEST_URI} !^/fidar/
    RewriteRule ^(.*)$ fidar/$1 [L]
</IfModule>

# 2. Frontend .htaccess (Place in: public_html/fidar/.htaccess)
# --------------------------------------------------------
# <IfModule mod_rewrite.c>
#     RewriteEngine On
#     RewriteBase /fidar/
#     RewriteCond %{REQUEST_FILENAME} !-f
#     RewriteCond %{REQUEST_FILENAME} !-d
#     RewriteRule ^ index.html [L]
# </IfModule>

# 3. Backend API .htaccess (Place in: public_html/api/.htaccess)
# --------------------------------------------------------
# <IfModule mod_rewrite.c>
#     RewriteEngine On
#     RewriteBase /api/
#     Header set Access-Control-Allow-Origin "*"
#     Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, DELETE"
#     Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
#     RewriteCond %{REQUEST_FILENAME} !-f
#     RewriteCond %{REQUEST_FILENAME} !-d
#     RewriteRule ^(.*)$ index.php?action=$1 [QSA,L]
# </IfModule>

# Gzip Compression for Core Web Vitals
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>`;

  const adminIndexPhp = `<?php
require_once __DIR__ . '/../config.php';

// Simple Password Auth for CMS
$adminPass = 'biesss2026';
$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

if (isset($_POST['login_pass'])) {
    if ($_POST['login_pass'] === $adminPass) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: index.php");
        exit;
    } else {
        $error = "رمز عبور اشتباه است.";
    }
}

if (isset($_GET['logout'])) {
    unset($_SESSION['admin_logged_in']);
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
    <meta charset="UTF-8">
    <title>پنل مدیریتفیدار بنداردیجیتال (Biesss PHP CMS)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" />
    <style>body { font-family: 'Vazirmatn', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6">
    <div class="max-w-4xl mx-auto">
        <?php if (!$isLoggedIn): ?>
            <div class="max-w-md mx-auto mt-20 p-8 rounded-2xl bg-slate-900 border border-slate-800">
                <h1 class="text-2xl font-bold mb-4 text-center text-emerald-400">ورود به پنل مدیریت PHP</h1>
                <?php if (isset($error)): ?>
                    <div class="p-3 mb-4 rounded bg-red-500/20 text-red-400 text-sm"><?= $error ?></div>
                <?php endif; ?>
                <form method="POST" class="space-y-4">
                    <div>
                        <label class="block text-sm mb-1 text-slate-400">رمز عبور پنل:</label>
                        <input type="password" name="login_pass" class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white" placeholder="biesss2026">
                    </div>
                    <button type="submit" class="w-full py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">ورود به سیستم</button>
                </form>
            </div>
        <?php else: ?>
            <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <h1 class="text-2xl font-bold text-emerald-400">مدیریت محتوای دو زبانه و دیتابیس MySQL</h1>
                <a href="?logout=1" class="px-4 py-2 rounded bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30">خروج</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
                    <span class="text-xs text-slate-400">دیتابیس متصل</span>
                    <h3 class="text-xl font-bold text-white mt-1">MySQL 8.0 (PDO)</h3>
                </div>
                <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
                    <span class="text-xs text-slate-400">زبان‌های فعال</span>
                    <h3 class="text-xl font-bold text-white mt-1">فارسی (FA) / انگلیسی (EN)</h3>
                </div>
                <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
                    <span class="text-xs text-slate-400">وضعیت سئو</span>
                    <h3 class="text-xl font-bold text-emerald-400 mt-1">فعال (Hreflang & Schema)</h3>
                </div>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h2 class="text-lg font-bold mb-4">دستورات مدیریت جداول MySQL</h2>
                <p class="text-slate-400 text-sm mb-4">شما می‌توانید از طریق این پنل کدهای جدید مقالات، خدمات و پیام‌های دریافت شده را مدیریت کنید.</p>
                <div class="flex gap-4">
                    <a href="../index.php" target="_blank" class="px-4 py-2 rounded bg-slate-800 text-slate-200 text-sm border border-slate-700 hover:bg-slate-700">مشاهده وب‌سایت اصلی</a>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>`;

  const apiPhp = `<?php
/**
 * Biesss Digital - REST API Endpoint
 * Handles JSON requests for services, portfolio, blog, seo, and contact form submission.
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true) ?: $_REQUEST;
$action = $input['action'] ?? $_GET['action'] ?? $_POST['action'] ?? 'services';
$db = getDBConnection();

try {
    switch ($action) {
        case 'services':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $title_fa = sanitizeInput($input['title_fa'] ?? $input['title'] ?? 'عنوان خدمت');
                $title_en = sanitizeInput($input['title_en'] ?? $title_fa);
                $desc_fa  = sanitizeInput($input['desc_fa'] ?? $input['description'] ?? '');
                $desc_en  = sanitizeInput($input['desc_en'] ?? $desc_fa);
                $icon     = sanitizeInput($input['icon'] ?? 'Code2');
                $stmt = $db->prepare("INSERT INTO services (title_fa, title_en, description_fa, description_en, icon) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$title_fa, $title_en, $desc_fa, $desc_en, $icon]);
                echo json_encode(['success' => true, 'message' => 'Service saved.']);
            } else {
                $stmt = $db->query("SELECT * FROM services ORDER BY id DESC");
                echo json_encode($stmt->fetchAll());
            }
            break;

        case 'portfolio':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $title_fa = sanitizeInput($input['title_fa'] ?? $input['title'] ?? 'پروژه جدید');
                $title_en = sanitizeInput($input['title_en'] ?? $title_fa);
                $stmt = $db->prepare("INSERT INTO portfolio (title_fa, title_en) VALUES (?, ?)");
                $stmt->execute([$title_fa, $title_en]);
                echo json_encode(['success' => true, 'message' => 'Portfolio saved.']);
            } else {
                $stmt = $db->query("SELECT * FROM portfolio ORDER BY id DESC");
                echo json_encode($stmt->fetchAll());
            }
            break;

        case 'articles':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $post_id   = sanitizeInput($input['post_id'] ?? $input['id'] ?? ('art-' . time()));
                $title_fa  = sanitizeInput($input['title_fa'] ?? $input['title']['fa'] ?? $input['title'] ?? 'بدون عنوان');
                $title_en  = sanitizeInput($input['title_en'] ?? $input['title']['en'] ?? $title_fa);
                $slug_fa   = sanitizeInput($input['slug_fa'] ?? $input['slug']['fa'] ?? str_replace(' ', '-', $title_fa));
                $slug_en   = sanitizeInput($input['slug_en'] ?? $input['slug']['en'] ?? str_replace(' ', '-', $title_en));
                $excerpt_fa= sanitizeInput($input['excerpt_fa'] ?? $input['excerpt']['fa'] ?? '');
                $excerpt_en= sanitizeInput($input['excerpt_en'] ?? $input['excerpt']['en'] ?? '');
                $content_fa= sanitizeInput($input['content_fa'] ?? $input['content']['fa'] ?? $excerpt_fa);
                $content_en= sanitizeInput($input['content_en'] ?? $input['content']['en'] ?? $excerpt_en);
                $cover_img = sanitizeInput($input['cover_image'] ?? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');

                $stmt = $db->prepare("INSERT INTO articles (post_id, slug_fa, slug_en, title_fa, title_en, excerpt_fa, excerpt_en, content_fa, content_en, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title_fa=?, title_en=?, content_fa=?, content_en=?");
                $stmt->execute([$post_id, $slug_fa, $slug_en, $title_fa, $title_en, $excerpt_fa, $excerpt_en, $content_fa, $content_en, $cover_img, $title_fa, $title_en, $content_fa, $content_en]);
                
                $artStmt = $db->query("SELECT * FROM articles ORDER BY id DESC");
                echo json_encode(['success' => true, 'message' => 'Article saved successfully.', 'articles' => $artStmt->fetchAll()]);
            } else {
                $stmt = $db->query("SELECT * FROM articles ORDER BY id DESC");
                echo json_encode($stmt->fetchAll());
            }
            break;

        case 'news':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $post_id   = sanitizeInput($input['post_id'] ?? $input['id'] ?? ('news-' . time()));
                $title_fa  = sanitizeInput($input['title_fa'] ?? $input['title']['fa'] ?? $input['title'] ?? 'خبر جدید');
                $title_en  = sanitizeInput($input['title_en'] ?? $input['title']['en'] ?? $title_fa);
                $slug_fa   = sanitizeInput($input['slug_fa'] ?? $input['slug']['fa'] ?? str_replace(' ', '-', $title_fa));
                $slug_en   = sanitizeInput($input['slug_en'] ?? $input['slug']['en'] ?? str_replace(' ', '-', $title_en));
                $excerpt_fa= sanitizeInput($input['excerpt_fa'] ?? $input['excerpt']['fa'] ?? '');
                $excerpt_en= sanitizeInput($input['excerpt_en'] ?? $input['excerpt']['en'] ?? '');
                $content_fa= sanitizeInput($input['content_fa'] ?? $input['content']['fa'] ?? $excerpt_fa);
                $content_en= sanitizeInput($input['content_en'] ?? $input['content']['en'] ?? $excerpt_en);
                $cover_img = sanitizeInput($input['cover_image'] ?? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');

                $stmt = $db->prepare("INSERT INTO news (post_id, slug_fa, slug_en, title_fa, title_en, excerpt_fa, excerpt_en, content_fa, content_en, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title_fa=?, title_en=?, content_fa=?, content_en=?");
                $stmt->execute([$post_id, $slug_fa, $slug_en, $title_fa, $title_en, $excerpt_fa, $excerpt_en, $content_fa, $content_en, $cover_img, $title_fa, $title_en, $content_fa, $content_en]);
                
                $newsStmt = $db->query("SELECT * FROM news ORDER BY id DESC");
                echo json_encode(['success' => true, 'message' => 'News saved successfully.', 'news' => $newsStmt->fetchAll()]);
            } else {
                $stmt = $db->query("SELECT * FROM news ORDER BY id DESC");
                echo json_encode($stmt->fetchAll());
            }
            break;

        case 'blog':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $postType = $input['postType'] ?? $input['post_type'] ?? 'article';
                if ($postType === 'news') {
                    $post_id   = sanitizeInput($input['post_id'] ?? $input['id'] ?? ('news-' . time()));
                    $title_fa  = sanitizeInput($input['title_fa'] ?? $input['title']['fa'] ?? $input['title'] ?? 'خبر جدید');
                    $title_en  = sanitizeInput($input['title_en'] ?? $input['title']['en'] ?? $title_fa);
                    $content_fa= sanitizeInput($input['content_fa'] ?? $input['content']['fa'] ?? '');
                    $content_en= sanitizeInput($input['content_en'] ?? $input['content']['en'] ?? '');
                    $stmt = $db->prepare("INSERT INTO news (post_id, slug_fa, slug_en, title_fa, title_en, content_fa, content_en) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title_fa=?, title_en=?");
                    $stmt->execute([$post_id, $post_id, $post_id, $title_fa, $title_en, $content_fa, $content_en, $title_fa, $title_en]);
                } else {
                    $post_id   = sanitizeInput($input['post_id'] ?? $input['id'] ?? ('art-' . time()));
                    $title_fa  = sanitizeInput($input['title_fa'] ?? $input['title']['fa'] ?? $input['title'] ?? 'مقاله جدید');
                    $title_en  = sanitizeInput($input['title_en'] ?? $input['title']['en'] ?? $title_fa);
                    $content_fa= sanitizeInput($input['content_fa'] ?? $input['content']['fa'] ?? '');
                    $content_en= sanitizeInput($input['content_en'] ?? $input['content']['en'] ?? '');
                    $stmt = $db->prepare("INSERT INTO articles (post_id, slug_fa, slug_en, title_fa, title_en, content_fa, content_en) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title_fa=?, title_en=?");
                    $stmt->execute([$post_id, $post_id, $post_id, $title_fa, $title_en, $content_fa, $content_en, $title_fa, $title_en]);
                }
                echo json_encode(['success' => true, 'message' => 'Post saved.']);
            } else {
                $stmt = $db->query("SELECT * FROM posts ORDER BY id DESC");
                $posts = $stmt->fetchAll();
                if (empty($posts)) {
                    $artStmt = $db->query("SELECT * FROM articles ORDER BY id DESC");
                    $newsStmt = $db->query("SELECT * FROM news ORDER BY id DESC");
                    $posts = array_merge($artStmt->fetchAll() ?: [], $newsStmt->fetchAll() ?: []);
                }
                echo json_encode($posts);
            }
            break;

        case 'seo':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $site_title_fa = sanitizeInput($input['site_title_fa'] ?? $input['siteTitle']['fa'] ?? 'فیدار سازه بندار');
                $site_title_en = sanitizeInput($input['site_title_en'] ?? $input['siteTitle']['en'] ?? 'Biesss Digital');
                $stmt = $db->prepare("UPDATE seo_settings SET site_title_fa = ?, site_title_en = ? WHERE id = 1");
                $stmt->execute([$site_title_fa, $site_title_en]);
                echo json_encode(['success' => true, 'message' => 'SEO settings updated.']);
            } else {
                $stmt = $db->query("SELECT * FROM seo_settings LIMIT 1");
                $seo = $stmt->fetch();
                echo json_encode($seo ?: []);
            }
            break;

        case 'contact':
            $name    = sanitizeInput($input['name'] ?? $input['fullname'] ?? 'کاربر وب‌سایت');
            $email   = filter_var($input['email'] ?? $input['user_email'] ?? 'contact@example.com', FILTER_VALIDATE_EMAIL) ?: 'contact@example.com';
            $phone   = sanitizeInput($input['phone'] ?? $input['mobile'] ?? '');
            $company = sanitizeInput($input['company'] ?? '');
            $service = sanitizeInput($input['service'] ?? 'general');
            $budget  = sanitizeInput($input['budget'] ?? 'unspecified');
            $message = sanitizeInput($input['message'] ?? $input['text'] ?? $input['content'] ?? 'درخواست تماس جدید');
            $formLang= sanitizeInput($input['lang'] ?? 'fa');

            $stmt = $db->prepare("INSERT INTO contact_messages (name, email, phone, company, service, budget, message, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $phone, $company, $service, $budget, $message, $formLang]);

            echo json_encode(['success' => true, 'message' => 'Message saved successfully.']);
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Invalid action']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>`;

  return [
    {
      filename: 'database.sql',
      language: 'sql',
      code: sqlSchema,
      description: {
        fa: 'فایل کدهای ساخت دیتابیس MySQL، جداول خدمات، مقالات، پیام‌ها و تنظیمات سئو دوزبانه',
        en: 'MySQL schema script creating bilingual tables, columns, indexes, and initial SEO configuration'
      }
    },
    {
      filename: 'config.php',
      language: 'php',
      code: configPhp,
      description: {
        fa: 'تنظیمات اتصال به دیتابیس PDO، مدیریت کوکی زبان‌ها و توابع امنیتی PHP',
        en: 'PDO database connection credentials, language cookie detection, and security functions'
      }
    },
    {
      filename: 'api.php',
      language: 'php',
      code: apiPhp,
      description: {
        fa: 'وب‌سرویس REST API با فرمت JSON برای ارتباط با خدمات، وبلاگ، نمونه‌کارها و فرم تماس',
        en: 'REST API JSON endpoint serving services, blog, portfolio, SEO metadata & contact handling'
      }
    },
    {
      filename: 'index.php',
      language: 'php',
      code: indexPhp,
      description: {
        fa: 'صفحه اصلی وب‌سایت با خواندن دیتای MySQL، تگ‌های سئو چندزبانه و هدر فیدار بندار',
        en: 'Main homepage script fetching MySQL data, injecting bilingual hreflang SEO meta, and biesss layout'
      }
    },
    {
      filename: 'contact.php',
      language: 'php',
      code: contactPhp,
      description: {
        fa: 'اسکریپت دریافت فرم تماس با ما، واعتبارسنجی و ذخیره مستقیم در دیتابیس MySQL',
        en: 'Form handler processing contact inquiries with PDO parameterized validation & MySQL insert'
      }
    },
    {
      filename: 'admin/index.php',
      language: 'php',
      code: adminIndexPhp,
      description: {
        fa: 'پنل مدیریت محتوای اختصاصی PHP با احراز هویت نشست (Session Auth)',
        en: 'Lightweight PHP CMS administration dashboard with session security'
      }
    },
    {
      filename: '.htaccess',
      language: 'htaccess',
      code: htaccess,
      description: {
        fa: 'فایل تنظیمات سرور آپاچی برای روتینگ آدرس‌های سئو تمیز (/fa/ و /en/) و فشردگی Gzip',
        en: 'Apache rewrite module rules for clean bilingual URLs and Gzip Core Web Vitals compression'
      }
    }
  ];
}
