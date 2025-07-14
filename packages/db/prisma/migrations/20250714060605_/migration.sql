/*
  Warnings:

  - The `status` column on the `Models` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'success', 'failed');

-- AlterTable
ALTER TABLE "Models" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'pending',
ALTER COLUMN "zipUrl" DROP NOT NULL,
ALTER COLUMN "zipUrl" SET DEFAULT '';
