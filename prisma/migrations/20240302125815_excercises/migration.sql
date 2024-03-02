-- CreateTable
CREATE TABLE "ExcerciseCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Excercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Excercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExcerciseCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ExcerciseCategory_name_key" ON "ExcerciseCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Excercise_name_key" ON "Excercise"("name");
