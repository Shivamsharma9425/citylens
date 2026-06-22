import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Issue from "@/models/Issue";

export async function GET() {
  await connectDB();

  const issues = await Issue.find();

  const statusMap: any = {};
  const categoryMap: any = {};

  issues.forEach((issue) => {
    statusMap[issue.status] = (statusMap[issue.status] || 0) + 1;

    categoryMap[issue.category] = (categoryMap[issue.category] || 0) + 1;
  });

  const statusData = Object.entries(statusMap).map(([name, value]) => ({
    name,
    value,
  }));

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return NextResponse.json({
    statusData,
    categoryData,
  });
}
