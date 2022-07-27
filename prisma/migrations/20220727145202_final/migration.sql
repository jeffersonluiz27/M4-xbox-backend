/*
  Warnings:

  - You are about to drop the column `genre_id` on the `game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_genre_id_fkey";

-- AlterTable
ALTER TABLE "game" DROP COLUMN "genre_id";

-- CreateTable
CREATE TABLE "_genre-games" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_genre-games_AB_unique" ON "_genre-games"("A", "B");

-- CreateIndex
CREATE INDEX "_genre-games_B_index" ON "_genre-games"("B");

-- AddForeignKey
ALTER TABLE "_genre-games" ADD CONSTRAINT "_genre-games_A_fkey" FOREIGN KEY ("A") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_genre-games" ADD CONSTRAINT "_genre-games_B_fkey" FOREIGN KEY ("B") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
