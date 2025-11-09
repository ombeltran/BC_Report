import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { hashPassword, comparePassword } from "@/utils/bcrypt";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

type Context = { params: { id: string } };

async function authenticate(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) throw new Error("No token provided");
  
  const payload = verifyToken(token);
  if (!payload) throw new Error("Invalid token");
  
  return payload;
}

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  })

  return NextResponse.json(user);
}


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
  const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });

  return NextResponse.json({ message: "User deleted", user: deletedUser });
}