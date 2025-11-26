import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken, verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

// GET /api/auth/login
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    verifyToken(token);
    const response = { user: "Authenticated" };
    return new Response(JSON.stringify(response), { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const { codEmployee, password } = await request.json();
    // console.log("Body recibido:", codEmployee, password);

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


    // You can save the token in a safe cookie
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      token,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !process.env.FORCE_INSECURE,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 día
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Wrong login" }, { status: 500 });
  }
}
