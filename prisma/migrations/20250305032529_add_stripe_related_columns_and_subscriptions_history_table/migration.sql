-- CreateEnum
CREATE TYPE "plan" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "subscription_status" AS ENUM ('ACTIVE', 'CANCELED', 'PAST_DUE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "current_period_end" TIMESTAMP(3),
ADD COLUMN     "plan" "plan" DEFAULT 'FREE',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscription_status" "subscription_status";

-- CreateTable
CREATE TABLE "subscriptions_history" (
    "id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "subscriptions_history_pkey" PRIMARY KEY ("id")
);
