// src/app/api/test/route.ts

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// export async function GET() {
//   // await connectDB();


//   return NextResponse.json({
//     success: true,
//   });
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}