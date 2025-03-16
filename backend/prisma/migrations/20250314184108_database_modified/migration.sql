/*
  Warnings:

  - You are about to drop the column `proposalAttachment` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `proposalMessage` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `preference` on the `Project` table. All the data in the column will be lost.
  - The `unit` column on the `SiteMeasurement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BidAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('BEFORE', 'AFTER');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('METER', 'FEET', 'YARD');

-- DropForeignKey
ALTER TABLE "BidAttachment" DROP CONSTRAINT "BidAttachment_bidId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "proposalAttachment",
DROP COLUMN "proposalMessage",
DROP COLUMN "status",
ADD COLUMN     "userStatus" "BidStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "vendorAttachmentName" TEXT,
ADD COLUMN     "vendorAttachmentUrl" TEXT,
ADD COLUMN     "vendorMessage" TEXT,
ADD COLUMN     "vendorStatus" "BidStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "preference",
ADD COLUMN     "budgetPreference" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "SiteMeasurement" DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT 'METER';

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "serviceId" VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE "BidAttachment";

-- DropTable
DROP TABLE "ProjectImage";

-- DropEnum
DROP TYPE "ImageType";

-- DropEnum
DROP TYPE "MeasurementUnit";

-- DropEnum
DROP TYPE "Preference";

-- CreateTable
CREATE TABLE "ProjectFile" (
    "id" VARCHAR(36) NOT NULL,
    "projectId" VARCHAR(36) NOT NULL,
    "url" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUpdateFile" (
    "projectUpdateId" VARCHAR(36) NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "ProjectUpdateFile_pkey" PRIMARY KEY ("projectUpdateId")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUpdateFile" ADD CONSTRAINT "ProjectUpdateFile_projectUpdateId_fkey" FOREIGN KEY ("projectUpdateId") REFERENCES "ProjectUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
