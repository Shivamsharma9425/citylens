import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";
import User from "@/models/User";

export async function GET(req: Request, { params }: any) {
  try {
    // console.log("PARAMS:", params);
    await connectDB();
     const { id } = await params;

    const issue = await Issue.findById(id)

     console.log("ISSUE:", issue);

    if (!issue) {
      return NextResponse.json(
        {
          error: "Issue not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      issue,
    });
  } catch (error: any) {
  console.error(error);

  return NextResponse.json(
    {
      error: error.message,
    },
    {
      status: 500,
    }
  );
}
}
