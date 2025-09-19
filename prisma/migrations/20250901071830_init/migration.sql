/*
  Warnings:

  - You are about to drop the column `birthday_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `birthday_at`,
    ADD COLUMN `birth_date` DATETIME(3) NOT NULL;
