/*
  Warnings:

  - You are about to drop the `_GameToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- DropIndex
DROP INDEX "profile_title_key";

-- AlterTable
ALTER TABLE "game" ADD COLUMN     "genre_id" TEXT;

-- DropTable
DROP TABLE "_GameToGenre";

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesToGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_profile_id_key" ON "favorites"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToGame_AB_unique" ON "_FavoritesToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToGame_B_index" ON "_FavoritesToGame"("B");

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToGame" ADD CONSTRAINT "_FavoritesToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToGame" ADD CONSTRAINT "_FavoritesToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
