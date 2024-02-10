/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plan_title_key" ON "Plan"("title");
