/*
  Warnings:

  - Made the column `description` on table `PasswordHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PasswordHistory" DROP CONSTRAINT "PasswordHistory_userId_fkey";

-- AlterTable
ALTER TABLE "PasswordHistory" ALTER COLUMN "description" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PasswordHistory" ADD CONSTRAINT "PasswordHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
