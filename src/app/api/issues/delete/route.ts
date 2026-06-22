import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/currentUser";

import Issue from "@/models/Issue";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const user: any = await getCurrentUser();

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 403,
        },
      );
    }

    const body = await req.json();

    await Issue.findByIdAndDelete(body.issueId);

    return NextResponse.json({
      message: "Issue deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
