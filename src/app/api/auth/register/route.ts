import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { hashPassword } from "@/utils/bcrypt";

// ******* Get all users *******
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users); // ✅ usar NextResponse.json
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ******* Create a new user *******
export async function POST(request: Request) {
  try {
    const { codEmployee, name, lastName, password, role } = await request.json();

    // Validate fields
    if (!codEmployee) return NextResponse.json({ error: "codEmployee field is required" }, { status: 400 });
    if (!name) return NextResponse.json({ error: "Name field is required" }, { status: 400 });
    if (!lastName) return NextResponse.json({ error: "LastName field is required" }, { status: 400 });
    if (!password) return NextResponse.json({ error: "Password field is required" }, { status: 400 });
    if (!role) return NextResponse.json({ error: "Role field is required" }, { status: 400 });

    // Verify if user already exists
    const existingUser = await prisma.user.findUnique({ where: { codEmployee } });
    if (existingUser) {
      return NextResponse.json({ error: "The user already exists" }, { status: 400 });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        codEmployee,
        name,
        lastName,
        role,
        password: await hashPassword(password)
      }
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error while creating the user" }, { status: 500 });
  }
}
