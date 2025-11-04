-- CreateTable
CREATE TABLE `ResumeReviewHistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tone` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `companyContext` VARCHAR(191) NULL,
    `sections` JSON NOT NULL,
    `result` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idx_resume_history_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
