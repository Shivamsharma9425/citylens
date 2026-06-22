import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { loginSchema } from "@/validations/login";

// flow--
// Register
// ↓
// Hash Password
// ↓
// Login
// ↓
// Compare Password(bcrypt.compare)
// ↓
// Generate JWT(jwt.sign)
// ↓
// Store Cookie
// ↓
// Verify Cookie(jwt.verify, validations/login.js)
// ↓
// Protected Route(profile page, Only logged-in users can access it.)

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const data = loginSchema.parse(body);

    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: "citylens_token",
      value: token,
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}