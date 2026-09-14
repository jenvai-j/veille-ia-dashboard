import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessCode } from "@/lib/access";

export function middleware(request: NextRequest) {
  if (request.cookies.get(ACCESS_COOKIE)?.value === accessCode()) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/acces";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // tout, sauf la page de code, son API et les fichiers statiques
    "/((?!acces|api/access|_next/static|_next/image|favicon.ico|robots.txt|images).*)",
  ],
};
