-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "lastLogin" DATETIME,
    "permission" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gymName" TEXT NOT NULL DEFAULT 'Gym'
);
INSERT INTO "new_User" ("age", "email", "gender", "id", "lastLogin", "name", "password", "permission", "salary", "session", "startDate") SELECT "age", "email", "gender", "id", "lastLogin", "name", "password", "permission", "salary", "session", "startDate" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_session_key" ON "User"("session");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
