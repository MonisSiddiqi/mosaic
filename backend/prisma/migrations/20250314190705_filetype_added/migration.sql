/*
  Warnings:

  - Added the required column `type` to the `ProjectUpdateFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectUpdateFile" ADD COLUMN     "type" "FileType" NOT NULL;
