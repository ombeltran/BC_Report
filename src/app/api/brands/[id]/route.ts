import { prisma } from "@/libs/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export async function PUT(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await _request.json();

  const updatedBrand = await prisma.brand.update({
    where: { id: Number(id) },
    data: {
      id: body.id,
      name: body.name,
    },
  });

  return NextResponse.json(updatedBrand);
}


export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = await context.params;
  const deletedBrand = await prisma.brand.delete({ where: { id: Number(id) } });

  return NextResponse.json(deletedBrand);
}