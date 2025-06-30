-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `university` VARCHAR(200) NULL,
    `grade` VARCHAR(50) NULL,
    `birth_date` DATETIME(3) NULL,
    `self_introduction` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `verification_token` VARCHAR(255) NULL,
    `reset_token` VARCHAR(255) NULL,
    `reset_token_expires` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recruiter` (
    `id` CHAR(36) NOT NULL,
    `company_name` VARCHAR(200) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `position` VARCHAR(100) NULL,
    `department` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `verification_token` VARCHAR(255) NULL,
    `reset_token` VARCHAR(255) NULL,
    `reset_token_expires` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Recruiter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NULL,
    `recruiter_id` CHAR(36) NULL,
    `user_type` ENUM('user', 'recruiter') NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT true,
    `auto_delete_after_one_year` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioBasicInfo` (
    `id` CHAR(36) NOT NULL,
    `portfolio_id` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `university` VARCHAR(200) NOT NULL,
    `grade` VARCHAR(50) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `self_introduction` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PortfolioBasicInfo_portfolio_id_key`(`portfolio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioSkills` (
    `id` CHAR(36) NOT NULL,
    `portfolio_id` CHAR(36) NOT NULL,
    `skill_tags` JSON NULL,
    `certifications` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PortfolioSkills_portfolio_id_key`(`portfolio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioProject` (
    `id` CHAR(36) NOT NULL,
    `portfolio_id` CHAR(36) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url` VARCHAR(500) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `PortfolioProject_portfolio_id_idx`(`portfolio_id`),
    INDEX `PortfolioProject_sort_order_idx`(`sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioExperience` (
    `id` CHAR(36) NOT NULL,
    `portfolio_id` CHAR(36) NOT NULL,
    `internship` VARCHAR(191) NULL,
    `extracurricular` VARCHAR(191) NULL,
    `awards` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PortfolioExperience_portfolio_id_key`(`portfolio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_recruiter_id_fkey` FOREIGN KEY (`recruiter_id`) REFERENCES `Recruiter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioBasicInfo` ADD CONSTRAINT `PortfolioBasicInfo_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioSkills` ADD CONSTRAINT `PortfolioSkills_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioProject` ADD CONSTRAINT `PortfolioProject_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioExperience` ADD CONSTRAINT `PortfolioExperience_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
