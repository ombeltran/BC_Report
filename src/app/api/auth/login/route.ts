import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken, verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";


// GET /api/auth/login
export async function GET() {
  try {
    const cookieStore = cookies(); // ⚠️ No usar await
    const token = cookieStore.get("token")?.value; // ✅ Esto funciona

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const payload = verifyToken(token); // valida JWT
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        codEmployee: true,
        name: true,
        lastName: true,
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No autorizado o fallo en la petición" },
      { status: 401 }
    );
  }
}


// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const { codEmployee, password } = await request.json();
    console.log("Body recibido:", codEmployee, password);

    if (!codEmployee || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { codEmployee: Number(codEmployee) } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const token = generateToken({ id: user.id, codEmployee: user.codEmployee });

    // You can save the token ina safe cookie
    const response = NextResponse.json({ message: "Successful login", token });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 día
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Wrong login" }, { status: 500 });
  }
}
