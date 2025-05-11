/*
  Warnings:

  - You are about to drop the column `pathssss` on the `banners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "banners" DROP COLUMN "pathssss";

-- CreateTable
CREATE TABLE "banner_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "ref_id" INTEGER NOT NULL,
    "bannerId" INTEGER NOT NULL,

    CONSTRAINT "banner_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ReTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "banner_images" ADD CONSTRAINT "banner_images_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "ReTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner_images" ADD CONSTRAINT "banner_images_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
