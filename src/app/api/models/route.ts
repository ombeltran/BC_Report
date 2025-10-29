import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const models = await prisma.model.findMany({
    include: { brand: true }, // opcional: incluir info de la marca
  });
  return NextResponse.json(models);
}
