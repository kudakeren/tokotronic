import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const sessionCookieName = "tokotronicindo.next-auth.session-token";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: sessionCookieName
  });
  const path = req.nextUrl.pathname;

  if (!token && (path.startsWith("/dashboard") || path.startsWith("/admin") || path.startsWith("/seller"))) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  if (path.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (path.startsWith("/seller") && token?.role !== "SELLER") {
    return NextResponse.redirect(new URL(token?.role === "ADMIN" ? "/admin" : "/dashboard", req.url));
  }
  if (path.startsWith("/dashboard") && token?.role === "SELLER") {
    return NextResponse.redirect(new URL("/seller", req.url));
  }
  if (path.startsWith("/dashboard") && token?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/seller/:path*"]
};
