-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codEmployee" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Production" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "seria_N" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Production_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_codEmployee_key" ON "User"("codEmployee");
