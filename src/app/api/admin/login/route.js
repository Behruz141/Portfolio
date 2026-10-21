import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  sessionToken,
  passwordMatches,
  isAdmin,
} from "@/lib/adminAuth";

// Kirganmi yoki yo'qmi (sahifa yangilanganda tekshiriladi)
export async function GET(request) {
  return NextResponse.json({ authenticated: isAdmin(request) });
}

// Kirish
export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        success: false,
        error:
          ".env.local da ADMIN_PASSWORD yo'q. Serverni qayta ishga tushiring.",
      },
      { status: 500 },
    );
  }

  const { password } = await request.json();
  if (!passwordMatches(password)) {
    return NextResponse.json(
      { success: false, error: "Parol noto'g'ri!" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 kun
  });
  return res;
}

// Chiqish
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
