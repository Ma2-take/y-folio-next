/*
  Warnings:

  - You are about to drop the `experiences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `other_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visibility_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `experiences` DROP FOREIGN KEY `experiences_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `other_info` DROP FOREIGN KEY `other_info_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `skill_tags` DROP FOREIGN KEY `skill_tags_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `visibility_settings` DROP FOREIGN KEY `visibility_settings_user_id_fkey`;

-- DropTable
DROP TABLE `experiences`;

-- DropTable
DROP TABLE `other_info`;

-- DropTable
DROP TABLE `projects`;

-- DropTable
DROP TABLE `skill_tags`;

-- DropTable
DROP TABLE `users`;

-- DropTable
DROP TABLE `visibility_settings`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `university` VARCHAR(191) NOT NULL,
    `faculty` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `selfIntroduction` VARCHAR(191) NOT NULL,
    `skillTags` VARCHAR(191) NOT NULL,
    `certifications` VARCHAR(191) NOT NULL,
    `projects` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `other` VARCHAR(191) NOT NULL,
    `publication` VARCHAR(191) NOT NULL,
    `visibilitySettings` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
