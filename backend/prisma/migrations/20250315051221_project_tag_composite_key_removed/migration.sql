/*
  Warnings:

  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ProjectTag` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_pkey",
ADD COLUMN     "id" VARCHAR(36) NOT NULL,
ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id");
