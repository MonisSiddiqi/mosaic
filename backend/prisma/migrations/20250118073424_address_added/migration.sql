/*
  Warnings:

  - You are about to drop the column `area` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `biddingEndDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_addressId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "area",
DROP COLUMN "biddingEndDate",
DROP COLUMN "endDate",
DROP COLUMN "height",
DROP COLUMN "length",
DROP COLUMN "startDate",
DROP COLUMN "unit",
DROP COLUMN "width";

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
