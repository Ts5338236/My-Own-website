import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if target is admin path and not the login page itself
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const tokenCookie = request.cookies.get(COOKIE_NAME);

    if (!tokenCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify token validity
    const verified = await verifyToken(tokenCookie.value);
    if (!verified) {
      // Clear cookie if invalid
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
