import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/currentUser";

import Notification from "@/models/Notification";

export async function PATCH() {
  try {
    await connectDB();

    const user: any = await getCurrentUser();

    await Notification.updateMany(
      {
        userId: user.id,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    return NextResponse.json({
      message: "Notifications marked as read",
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
