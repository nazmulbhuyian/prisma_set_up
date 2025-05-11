/*
  Warnings:

  - Changed the type of `paths` on the `banners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `pathssss` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banners" DROP COLUMN "paths",
ADD COLUMN     "paths" JSONB NOT NULL,
DROP COLUMN "pathssss",
ADD COLUMN     "pathssss" JSONB NOT NULL;
