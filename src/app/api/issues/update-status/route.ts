import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/currentUser";
import Notification from "@/models/Notification";
import Issue from "@/models/Issue";

export async function PATCH(req: Request) {
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

    issue.status = body.status;

    if (!issue.history) {
      issue.history = [];
    }
    issue.history.push({
      status: body.status,
      updatedAt: new Date(),
    });

    await issue.save();
    await Notification.create({
      userId: issue.reportedBy,

      issueId: issue._id,

      message: `Your issue "${issue.title}" is now ${body.status}`,
    });

    return NextResponse.json({
      message: "Status updated",
      issue,
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
