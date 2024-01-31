-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MessageRead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    CONSTRAINT "MessageRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MessageRead" ("id", "messageId", "read", "userId") SELECT "id", "messageId", "read", "userId" FROM "MessageRead";
DROP TABLE "MessageRead";
ALTER TABLE "new_MessageRead" RENAME TO "MessageRead";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
