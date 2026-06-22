import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/currentUser";

import Notification from "@/models/Notification";

export async function GET() {
  try {
    await connectDB();

    const user: any = await getCurrentUser();

    const count = await Notification.countDocuments({
      userId: user.id,
      isRead: false,
    });

    return NextResponse.json({
      count,
    });
  } catch {
    return NextResponse.json(
      {
        count: 0,
      },
      {
        status: 401,
      },
    );
  }
}
