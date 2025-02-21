/*
  Warnings:

  - You are about to drop the `LinkClick` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "device_type" AS ENUM ('MOBILE', 'DESKTOP');

-- DropForeignKey
ALTER TABLE "LinkClick" DROP CONSTRAINT "LinkClick_shortenedLinkId_fkey";

-- DropTable
DROP TABLE "LinkClick";

-- DropEnum
DROP TYPE "DeviceType";

-- CreateTable
CREATE TABLE "link_clicks" (
    "id" TEXT NOT NULL,
    "shortenedLinkId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "deviceType" "device_type",
    "referrer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "link_clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_shortenedLinkId_fkey" FOREIGN KEY ("shortenedLinkId") REFERENCES "shortened_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
