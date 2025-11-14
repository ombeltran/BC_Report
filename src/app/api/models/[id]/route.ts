import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();

  const updatedModel = await prisma.model.update({
    where: { id: Number(id) },
    data: {
      // id: body.id,
      name: body.name,
      brandId: body.brandId,
    },
  });

  return NextResponse.json(updatedModel);
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = params;
  const deletedModel = await prisma.model.delete({ where: { id: Number(id) } });

  return NextResponse.json(deletedModel);
}