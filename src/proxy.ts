// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/constants";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // If yhere isn't token, so it block teh access
  if (!token) {
    return NextResponse.json({ error: "Unauthorized (no token)" }, { status: 401 });
  }

  // Tehre is token, it continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/production/:path*"], // Protected routes
};

