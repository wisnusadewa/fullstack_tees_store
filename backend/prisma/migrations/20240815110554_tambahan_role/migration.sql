-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT';
