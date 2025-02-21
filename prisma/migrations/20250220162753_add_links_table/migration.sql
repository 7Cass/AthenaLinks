-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP');

-- CreateTable
CREATE TABLE "shortened_links" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "enableIntermediatePage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shortened_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkClick" (
    "id" TEXT NOT NULL,
    "shortenedLinkId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "deviceType" "DeviceType",
    "referrer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortened_links_slug_key" ON "shortened_links"("slug");

-- AddForeignKey
ALTER TABLE "shortened_links" ADD CONSTRAINT "shortened_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_shortenedLinkId_fkey" FOREIGN KEY ("shortenedLinkId") REFERENCES "shortened_links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
