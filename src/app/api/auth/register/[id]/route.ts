import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { hashPassword, comparePassword } from "@/utils/bcrypt";
import { verifyToken } from "@/utils/jwt";

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



export async function PUT(request: Request, context: Context) {
  try {
    // Verify the token
    await authenticate(request);

    const { id } = context.params;
    const data = await request.json();

    // If come the password, hash it
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const userUpdated = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(userUpdated);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    // Verify the token
    await authenticate(request);

    const { id } = context.params;

    // If come the password, hash it

    const userDeleted = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(userDeleted);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}