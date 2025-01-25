/*
  Warnings:

  - You are about to drop the column `cityId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `Address` table. All the data in the column will be lost.
  - The `status` column on the `Bid` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `ProjectImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('BEFORE', 'AFTER');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('METER', 'FEET', 'YARD', 'SQUARE_METER', 'SQUARE_FEET');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'AWARDED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'VENDOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_stateId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_countryId_fkey";

-- DropIndex
DROP INDEX "Address_countryId_stateId_cityId_idx";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "stateId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "status",
ADD COLUMN     "status" "BidStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "ProjectImage" DROP COLUMN "type",
ADD COLUMN     "type" "ImageType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "State";

-- DropEnum
DROP TYPE "BidStatusEnum";

-- DropEnum
DROP TYPE "MeasurementUnitEnum";

-- DropEnum
DROP TYPE "ProjectImageEnum";

-- DropEnum
DROP TYPE "ProjectStatusEnum";

-- DropEnum
DROP TYPE "UserRoleEnum";
