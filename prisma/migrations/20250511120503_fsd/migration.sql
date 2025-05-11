/*
  Warnings:

  - Made the column `paths` on table `banners` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pathssss` on table `banners` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "banners" ALTER COLUMN "paths" SET NOT NULL,
ALTER COLUMN "pathssss" SET NOT NULL;
