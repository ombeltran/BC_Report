export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

// Function to get all production records
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const productionRecord = await prisma.production.findMany();
  return NextResponse.json(productionRecord);
}

// Function to create a new production record
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const data = await request.json();
  const newRecord = await prisma.production.create({ data });
  return NextResponse.json(newRecord, { status: 201 });
}
