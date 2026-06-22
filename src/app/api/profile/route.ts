import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("citylens_token")
      ?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const decoded =
    verifyToken(token);

  return NextResponse.json({
    user: decoded,
  });
}