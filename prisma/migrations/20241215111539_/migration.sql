/*
  Warnings:

  - Added the required column `isPrivate` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaHeight` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaWidth` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL,
ADD COLUMN     "mediaHeight" INTEGER NOT NULL,
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "mediaUrl" TEXT NOT NULL,
ADD COLUMN     "mediaWidth" INTEGER NOT NULL;
