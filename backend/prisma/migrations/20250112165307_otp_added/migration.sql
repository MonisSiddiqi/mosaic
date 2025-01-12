-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('REGISTRATION', 'FORGOT_PASSWORD');

-- CreateTable
CREATE TABLE "Otp" (
    "id" VARCHAR(36) NOT NULL,
    "type" "OtpType" NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "oneTimePassword" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
