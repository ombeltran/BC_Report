import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

// GET /api/brands
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    verifyToken(token);
    const brands = await prisma.brand.findMany()
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// POST /api/brands
export async function POST(request: Request) {
    try {
        const { name } = await request.json()

        // Validate fields
        if (!name) {
            return NextResponse.json({ error: "Name field is required" }, { status: 400 });
        }

        // Verify if user already exists
        const existingBrands = await prisma.brand.findUnique({ where: { name } });
        if (existingBrands) {
            return NextResponse.json({ error: "The brand already exist" }, { status: 400 });
        }

        // Create user
        const brand = await prisma.brand.create({
            data: {
                name,
            }
        });

        return NextResponse.json({ message: "Brand created successful", brand }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error meanwhile created the brand" }, { status: 500 });
    }
}