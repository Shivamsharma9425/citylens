import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";

import { getCurrentUser } from "@/lib/currentUser";

export async function GET() {

  try {
    await connectDB();

    const user: any =
      await getCurrentUser();

    const issues =
      await Issue.find({
        reportedBy: user.id,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      {
        issues,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}