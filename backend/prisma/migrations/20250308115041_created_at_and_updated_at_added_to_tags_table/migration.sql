/*
  Warnings:

  - Added the required column `updatedAt` to the `VendorService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `VendorTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendorService" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "VendorTag" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;
