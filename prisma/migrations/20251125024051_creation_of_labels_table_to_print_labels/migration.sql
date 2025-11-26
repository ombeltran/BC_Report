-- CreateTable
CREATE TABLE "Labels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "seria_N" TEXT NOT NULL,
    "upc" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "qty" TEXT NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Labels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
