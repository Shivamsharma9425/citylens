import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

import Issue from "@/models/Issue";
import { issueSchema } from "@/validations/issue";
import { getDepartment } from "@/lib/getDepartment";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("citylens_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    const body = await req.json();

    const data = issueSchema.parse(body);

    const issue = await Issue.create({
      imageUrl: data.imageUrl || "",
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      reportedBy: decoded.id,
      department: getDepartment(data.category),
      history: [
        {
          status: "PENDING",
          updatedAt: new Date(),
        },
      ],
    });

    return NextResponse.json(
      {
        message: "Issue created successfully",
        issue,
      },
      {
        status: 201,
      },
    );
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
