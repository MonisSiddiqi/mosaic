/*
  Warnings:

  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("projectId", "tagId");
