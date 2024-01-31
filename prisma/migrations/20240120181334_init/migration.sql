-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "session" TEXT,
    "permission" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "daysLeft" INTEGER NOT NULL,
    "perMonth" DECIMAL NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "shouldPay" DECIMAL NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
