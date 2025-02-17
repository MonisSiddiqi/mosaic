-- CreateEnum
CREATE TYPE "Preference" AS ENUM ('HIGH_QUALITY', 'LOW_PRICE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "preference" "Preference";
