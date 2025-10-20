import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

type paramsProps = {
  params: {
    id: string
  }
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

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  const data = await request.json()
  const userUpdated = await prisma.user.update({
    where: {
      id: Number(id)
    },
    data: data
  })

  return NextResponse.json(userUpdated);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const userRemoved = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })

    return NextResponse.json(userRemoved);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message })
    }
    return NextResponse.json({ error: 'Unknown error' })
  }
}