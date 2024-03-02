/*
  Warnings:

  - Added the required column `description` to the `Excercise` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Excercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Excercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExcerciseCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Excercise" ("categoryId", "id", "name") SELECT "categoryId", "id", "name" FROM "Excercise";
DROP TABLE "Excercise";
ALTER TABLE "new_Excercise" RENAME TO "Excercise";
CREATE UNIQUE INDEX "Excercise_name_key" ON "Excercise"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
