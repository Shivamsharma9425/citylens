import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";

export async function GET() {
  try {
    await connectDB();

    const issues = await Issue.find()
      .sort({ upvotes: -1 });

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
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}