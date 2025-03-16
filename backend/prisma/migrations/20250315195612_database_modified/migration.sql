-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "preferenceMessage" TEXT;

-- AlterTable
ALTER TABLE "SiteMeasurement" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "SampleFile" (
    "id" VARCHAR(36) NOT NULL,
    "projectId" VARCHAR(36) NOT NULL,
    "url" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SampleFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SampleFile" ADD CONSTRAINT "SampleFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
