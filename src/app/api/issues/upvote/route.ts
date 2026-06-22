import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";

import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user: any = await getCurrentUser();

    const body = await req.json();

    const issue = await Issue.findById(body.issueId);

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
    console.log("USER ID:", user.id);
    console.log("UPVOTED BY:", issue.upvotedBy);
    const alreadyUpvoted =
  (issue.upvotedBy || []).some(
    (id: any) =>
      String(id) === String(user.id)
  );

    if (alreadyUpvoted) {
      return NextResponse.json(
        {
          error: "Already upvoted",
          upvotes: issue.upvotes,
        },
        {
          status: 400,
        },
      );
    }

    if (!issue.upvotedBy) {
      issue.upvotedBy = [];
    }
    issue.upvotes += 1;

    issue.upvotedBy.push(user.id);

    await issue.save();

    return NextResponse.json({
      message: "Upvoted successfully",

      upvotes: issue.upvotes,
    });
  } catch (error) {
    console.error(error);

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
