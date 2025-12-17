import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes by checking JWT cookie
 */
export function middleware(request: NextRequest) {
  // Get the JWT token from cookies
  const token = request.cookies.get("auth_token")?.value;

  const url = request.nextUrl.clone();

  // Define routes that do NOT require authentication
  const publicPaths = ["/signin", "/signup", "/favicon.ico"];

  // If path is public, allow access
  if (publicPaths.includes(url.pathname)) {
    return NextResponse.next();
  }

  // If token is missing, redirect to /signin
  if (!token) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Token exists, allow request
  return NextResponse.next();
}

/**
 * Configure which paths middleware applies to
 * This excludes Next.js static files and API routes
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
