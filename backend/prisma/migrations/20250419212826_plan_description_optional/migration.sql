/*
  Warnings:

  - You are about to drop the column `subscriptionPlanId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPlanId` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the `SubscriptionPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_subscriptionPlanId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_subscriptionPlanId_fkey";

-- DropIndex
DROP INDEX "UserPlan_userId_subscriptionPlanId_couponId_idx";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "subscriptionPlanId",
ADD COLUMN     "planId" VARCHAR(36),
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserPlan" DROP COLUMN "subscriptionPlanId",
ADD COLUMN     "planId" VARCHAR(36);

-- DropTable
DROP TABLE "SubscriptionPlan";

-- CreateTable
CREATE TABLE "Plan" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE INDEX "UserPlan_userId_planId_couponId_idx" ON "UserPlan"("userId", "planId", "couponId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
