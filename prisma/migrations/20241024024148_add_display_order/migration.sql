/*
  Warnings:

  - Added the required column `displayOrder` to the `UserFavoriteCity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserFavoriteCity" ADD COLUMN     "displayOrder" INTEGER NOT NULL;
