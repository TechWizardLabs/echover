import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/signin"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin).*)"],
};