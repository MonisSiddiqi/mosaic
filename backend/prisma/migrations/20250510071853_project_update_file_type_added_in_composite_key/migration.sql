/*
  Warnings:

  - The primary key for the `ProjectUpdateFile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProjectUpdateFile" DROP CONSTRAINT "ProjectUpdateFile_pkey",
ADD CONSTRAINT "ProjectUpdateFile_pkey" PRIMARY KEY ("projectUpdateId", "type");
