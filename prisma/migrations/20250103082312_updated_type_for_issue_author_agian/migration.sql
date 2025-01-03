/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `author` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Issue_author_key` ON `Issue`(`author`);
