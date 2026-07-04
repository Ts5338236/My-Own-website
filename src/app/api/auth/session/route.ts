import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionCookie = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const token = sessionCookie.split("=")[1];
    const decoded = await verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { email: decoded.email, name: decoded.name },
    });
  } catch (err) {
    console.error("Session check API error:", err);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
