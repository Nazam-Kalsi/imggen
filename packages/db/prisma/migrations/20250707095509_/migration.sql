/*
  Warnings:

  - Added the required column `zipUrl` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "zipUrl" TEXT NOT NULL;
