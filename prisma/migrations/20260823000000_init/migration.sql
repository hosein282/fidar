-- ========================================================
-- Initial Prisma migration for `fidar_db` (MySQL)
-- Mirrors database/schema.sql — safe to run on an
-- existing database (all statements are idempotent).
-- ========================================================

-- Table: posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` VARCHAR(100) NOT NULL,
  `post_type` ENUM('article', 'news') NOT NULL DEFAULT 'article',
  `status` ENUM('published', 'draft', 'unpublished') NOT NULL DEFAULT 'published',
  `slug_fa` VARCHAR(255) NOT NULL,
  `slug_en` VARCHAR(255) NOT NULL,
  `title_fa` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `excerpt_fa` TEXT NULL,
  `excerpt_en` TEXT NULL,
  `content_fa` LONGTEXT NULL,
  `content_en` LONGTEXT NULL,
  `author_fa` VARCHAR(100) NULL DEFAULT 'تیم فنی فیدار بندار',
  `author_en` VARCHAR(100) NULL DEFAULT 'Biesss Engineering',
  `date` DATE NOT NULL,
  `read_time` VARCHAR(50) NULL DEFAULT '5 min',
  `category_fa` VARCHAR(100) NULL DEFAULT 'مقالات تخصصی',
  `category_en` VARCHAR(100) NULL DEFAULT 'Technical Articles',
  `cover_image` VARCHAR(500) NULL,
  `seo_title_fa` VARCHAR(255) NULL,
  `seo_title_en` VARCHAR(255) NULL,
  `seo_desc_fa` TEXT NULL,
  `seo_desc_en` TEXT NULL,
  `seo_keywords_fa` VARCHAR(500) NULL,
  `seo_keywords_en` VARCHAR(500) NULL,
  `views` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `idx_slug_fa` ON `posts`(`slug_fa`);
CREATE INDEX `idx_slug_en` ON `posts`(`slug_en`);
CREATE INDEX `idx_post_type` ON `posts`(`post_type`);

-- Table `contact_messages`
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `company` VARCHAR(150) NULL,
  `service` VARCHAR(100) NULL,
  `budget` VARCHAR(100) NULL,
  `message` TEXT NOT NULL,
  `lang` ENUM('fa', 'en') NOT NULL DEFAULT 'fa',
  `status` ENUM('new', 'contacted', 'resolved') NOT NULL DEFAULT 'new',
  `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table `seo_settings`
CREATE TABLE IF NOT EXISTS `seo_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `site_title_fa` VARCHAR(255) NOT NULL,
  `site_title_en` VARCHAR(255) NOT NULL,
  `meta_desc_fa` TEXT NOT NULL,
  `meta_desc_en` TEXT NOT NULL,
  `keywords_fa` VARCHAR(500) NULL,
  `keywords_en` VARCHAR(500) NULL,
  `og_image` VARCHAR(500) NULL,
  `canonical_url` VARCHAR(255) NOT NULL,
  `twitter_handle` VARCHAR(100) NULL,
  `indexing_enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;