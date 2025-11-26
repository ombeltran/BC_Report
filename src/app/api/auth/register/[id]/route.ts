import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { hashPassword } from "@/utils/bcrypt";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  return NextResponse.json(user);
}

export async function PUT(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const body = await _request.json();

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      codEmployee: body.codEmployee,
      name: body.name,
      lastName: body.lastName,
      password: body.password ? await hashPassword(body.password) : undefined,
      role: body.role,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });

  return NextResponse.json({ message: "User deleted", user: deletedUser });
}
