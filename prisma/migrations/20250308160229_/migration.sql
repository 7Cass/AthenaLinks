/*
  Warnings:

  - Made the column `subscription_status` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "subscription_status" ADD VALUE 'NO_SUBSCRIPTION';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "subscription_status" SET NOT NULL,
ALTER COLUMN "subscription_status" SET DEFAULT 'NO_SUBSCRIPTION';
