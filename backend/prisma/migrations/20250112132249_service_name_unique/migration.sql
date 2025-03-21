/*
  Warnings:

  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
