/*
  Warnings:

  - Added the required column `avatar` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `avatar` VARCHAR(255) NOT NULL;
