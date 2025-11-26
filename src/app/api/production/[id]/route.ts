import { prisma } from "@/libs/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export async function PUT(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const body = await _request.json();

  const updatedProduction = await prisma.production.update({
    where: { id: Number(id) },
    data: {
      brand: body.brand,
      model: body.model,
      seria_N: body.seria_N,
      category: body.category,
      userId: body.userId,
    },
  });

  return NextResponse.json(updatedProduction);
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const deletedProduction = await prisma.production.delete({ where: { id: Number(id) } });

  return NextResponse.json(deletedProduction);
}
