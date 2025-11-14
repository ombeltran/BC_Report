import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

// GET /api/models
export async function GET() {
  try {
    const cookieStore = await cookies(); // No es async
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    verifyToken(token); // lanza si inválido

    const models = await prisma.model.findMany();
    return NextResponse.json(models);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


// POST /api/models
export async function POST(request: Request) {
    try {
        const { name, brandId } = await request.json()

        // Validate fields
        if (!name) {
            return NextResponse.json({ error: "Name field is required" }, { status: 400 });
        }
        if (!brandId) {
            return NextResponse.json({ error: "Brand code field is required" }, { status: 400 });
        }

        // Verify if user already exists
        const existingModel = await prisma.model.findUnique({ where: { name } });
        if (existingModel) {
            return NextResponse.json({ error: "The model already exist" }, { status: 400 });
        }

        // Create user
        const model = await prisma.model.create({
            data: {
                name,
                brandId: Number(brandId),
            }
        });

        return NextResponse.json({ message: "Model created successful", model }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error meanwhile created the model" }, { status: 500 });
    }
}