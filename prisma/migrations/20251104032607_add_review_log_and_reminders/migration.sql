-- CreateTable
CREATE TABLE `ReviewLog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `tone` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `writingStyle` VARCHAR(191) NULL,
    `sectionStats` JSON NOT NULL,
    `overallScore` INTEGER NULL,
    `averageSectionScore` DOUBLE NULL,
    `totalSections` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_review_log_user_created_at`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewReminder` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `channel` VARCHAR(191) NOT NULL DEFAULT 'in-app',
    `scheduledAt` DATETIME(3) NOT NULL,
    `payload` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `idx_review_reminder_user_schedule`(`userId`, `scheduledAt`),
    INDEX `idx_review_reminder_status_schedule`(`status`, `scheduledAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
