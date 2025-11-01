import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants"; // tu nombre de cookie
import { cookies } from "next/headers";

// POST /api/auth/logout
export async function POST() {
  const cookieStore = await cookies();

  // Delete cookie
  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    expires: new Date(0), // Provouqe the cookie to expire immediately
    path: "/",
  });

  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
