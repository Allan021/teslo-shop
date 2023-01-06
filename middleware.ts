import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { CONSTANTS } from "./core";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `${CONSTANTS.REDIRECT_PARAM}=${pathname}`;

    return NextResponse.redirect(url);
  }

  //middleware for dashboard
  if (pathname === "/admin") {
    const validRoles = ["admin", "seller", 'super-user'];

    if (!validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/checkout/address",
    "/checkout/summary",
    "/orders/:path*",
    "/admin",

  ],
};


