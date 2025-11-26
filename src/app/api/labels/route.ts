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

        verifyToken(token);

        const labels = await prisma.labels.findMany();
        return NextResponse.json(labels);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}

// POST /api/labels
export async function POST(request: Request) {
    try {
        const { brand, model, seria_N, upc, qty } = await request.json()

        // Validate fields
        if (!brand) { return NextResponse.json({ error: "Brand field is required" }, { status: 400 }); }
        if (!model) { return NextResponse.json({ error: "Model field is required" }, { status: 400 }); }
        if (!seria_N) { return NextResponse.json({ error: "Serial number field is required" }, { status: 400 }); }
        if (!upc) { return NextResponse.json({ error: "UPC field is required" }, { status: 400 }); }
        if (!qty) { return NextResponse.json({ error: "Quantity field is required" }, { status: 400 }); }

        // Create label
        const data = await request.json();
        const newLabel = await prisma.labels.create({data});

        return NextResponse.json({ message: "Label created successful", newLabel }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error meanwhile created the label" }, { status: 500 });
    }
}