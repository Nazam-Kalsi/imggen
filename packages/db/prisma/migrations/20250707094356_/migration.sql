/*
  Warnings:

  - You are about to drop the column `image` on the `OutputImages` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "OutputImages" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://picsum.photos/200',
ADD COLUMN     "prompt" TEXT NOT NULL;
