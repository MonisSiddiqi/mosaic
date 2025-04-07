-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "license" TEXT;

-- CreateTable
CREATE TABLE "BusinessAddress" (
    "id" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36),
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAddress_userId_key" ON "BusinessAddress"("userId");

-- AddForeignKey
ALTER TABLE "BusinessAddress" ADD CONSTRAINT "BusinessAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
