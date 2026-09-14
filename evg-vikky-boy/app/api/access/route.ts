import { NextResponse } from "next/server";
import { ACCESS_COOKIE, accessCode, normalize } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let code = "";
  try {
    const body = (await request.json()) as { code?: string };
    code = normalize(body.code ?? "");
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  if (code !== accessCode()) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, accessCode(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180, // jusqu'au voyage
  });
  return res;
}
