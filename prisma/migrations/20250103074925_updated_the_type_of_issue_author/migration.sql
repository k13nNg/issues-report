/*
  Warnings:

  - You are about to alter the column `author` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `author` INTEGER NOT NULL;
