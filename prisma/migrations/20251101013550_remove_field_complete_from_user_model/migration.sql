/*
  Warnings:

  - You are about to drop the column `complete` on the `Production` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Production" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "seria_N" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Production_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Production" ("brand", "category", "id", "model", "note", "seria_N", "userId") SELECT "brand", "category", "id", "model", "note", "seria_N", "userId" FROM "Production";
DROP TABLE "Production";
ALTER TABLE "new_Production" RENAME TO "Production";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
