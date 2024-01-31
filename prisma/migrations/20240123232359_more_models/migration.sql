-- CreateTable
CREATE TABLE "MessageRead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "read" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    CONSTRAINT "MessageRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "sent" DATETIME NOT NULL
);

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
    "endsAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME
);
INSERT INTO "new_Subscriber" ("age", "bucketPrice", "daysLeft", "duration", "endsAt", "gender", "id", "name", "paymentAmount", "startedAt", "surname") SELECT "age", "bucketPrice", "daysLeft", "duration", "endsAt", "gender", "id", "name", "paymentAmount", "startedAt", "surname" FROM "Subscriber";
DROP TABLE "Subscriber";
ALTER TABLE "new_Subscriber" RENAME TO "Subscriber";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
