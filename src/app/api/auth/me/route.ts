import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {
  try {
    const user: any =
      await getCurrentUser();

    return NextResponse.json({
      user,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}