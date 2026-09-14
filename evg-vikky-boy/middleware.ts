import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessCode } from "@/lib/access";

const UNLOCK_PATH = "/acces";

export function middleware(request: NextRequest) {
  const code = accessCode();
  const { pathname } = request.nextUrl;

  // Verrou désactivé : le site est ouvert, et la page de code n'a plus de sens.
  if (!code) {
    if (pathname === UNLOCK_PATH) {
      const home = request.nextUrl.clone();
      home.pathname = "/";
      return NextResponse.redirect(home);
    }
    return NextResponse.next();
  }

  // Verrou actif : on laisse passer la page de code et son API.
  if (pathname === UNLOCK_PATH || pathname === "/api/access") {
    return NextResponse.next();
  }

  if (request.cookies.get(ACCESS_COOKIE)?.value === code) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = UNLOCK_PATH;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|images).*)",
  ],
};
