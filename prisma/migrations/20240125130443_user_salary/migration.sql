-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "session" TEXT,
    "lastLogin" DATETIME,
    "permission" INTEGER NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "gender" TEXT NOT NULL DEFAULT 'Male',
    "salary" INTEGER NOT NULL DEFAULT 0,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "id", "lastLogin", "name", "password", "permission", "session") SELECT "email", "id", "lastLogin", "name", "password", "permission", "session" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
