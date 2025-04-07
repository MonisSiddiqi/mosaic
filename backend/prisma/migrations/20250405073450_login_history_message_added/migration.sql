-- AlterTable
ALTER TABLE "LoginHistory" ADD COLUMN     "message" TEXT;

-- CreateIndex
CREATE INDEX "LoginHistory_userId_idx" ON "LoginHistory"("userId");
