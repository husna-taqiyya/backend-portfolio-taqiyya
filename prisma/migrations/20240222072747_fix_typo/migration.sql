/*
  Warnings:

  - You are about to drop the column `insitutionName` on the `education` table. All the data in the column will be lost.
  - Added the required column `institutionName` to the `education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `education` DROP COLUMN `insitutionName`,
    ADD COLUMN `institutionName` VARCHAR(100) NOT NULL;
