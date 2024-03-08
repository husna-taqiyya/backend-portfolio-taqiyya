-- DropForeignKey
ALTER TABLE `projectskill` DROP FOREIGN KEY `projectskill_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectskill` DROP FOREIGN KEY `projectskill_skillId_fkey`;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
