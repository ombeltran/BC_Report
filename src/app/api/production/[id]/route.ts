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

    const id = params.id
    const body = await request.json();


    const updatedProduction = await prisma.production.update({
        where: { id: Number(id) },
        data: {
            id: body.id,
            brand: body.brand,
            model: body.model,
            seria_N: body.seria_N,
            category: body.category,
            userId: body.userId,
        },
    });

    return NextResponse.json(updatedProduction);
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
    const deletedProduction = await prisma.production.delete({ where: { id: Number(id) } });

    return NextResponse.json(deletedProduction);
}