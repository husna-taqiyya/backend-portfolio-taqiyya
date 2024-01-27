/*
  Warnings:

  - You are about to drop the column `instutuionName` on the `education` table. All the data in the column will be lost.
  - Added the required column `insitutionName` to the `education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `education` DROP COLUMN `instutuionName`,
    ADD COLUMN `insitutionName` VARCHAR(100) NOT NULL;
