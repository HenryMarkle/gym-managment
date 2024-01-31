/*
  Warnings:

  - You are about to drop the column `perMonth` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `shouldPay` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to alter the column `paymentAmount` on the `Subscriber` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - Added the required column `bucketPrice` to the `Subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscriber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "duration" INTEGER,
    "daysLeft" INTEGER,
    "bucketPrice" DECIMAL NOT NULL,
    "paymentAmount" DECIMAL NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL
);
INSERT INTO "new_Subscriber" ("age", "daysLeft", "duration", "endsAt", "gender", "id", "name", "paymentAmount", "startedAt", "surname") SELECT "age", "daysLeft", "duration", "endsAt", "gender", "id", "name", "paymentAmount", "startedAt", "surname" FROM "Subscriber";
DROP TABLE "Subscriber";
ALTER TABLE "new_Subscriber" RENAME TO "Subscriber";
CREATE INDEX "Subscriber_name_surname_idx" ON "Subscriber"("name", "surname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
