import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/currentUser";

import Notification from "@/models/Notification";

export async function GET() {
  try {
    await connectDB();

    const user: any = await getCurrentUser();

    const notifications = await Notification.find({
      userId: user.id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      notifications,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
