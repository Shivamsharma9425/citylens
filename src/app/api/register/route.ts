import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/validations/auth";

// flow--
// Receive Request
//      ↓
// Connect DB
//      ↓
// Validate Data
//      ↓
// Check Existing User
//      ↓
// Hash Password
//      ↓
// Create User
//      ↓
// Send Success Response

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = registerSchema.parse(body);

    const existingUser =
      await User.findOne({
        email: data.email,
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 400,
        }
      );
    }       

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10 // salt rounds(salt factor) - the number of times the hashing algorithm is applied to the password
      );

    const user =
      await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      {
        status: 201,
      }
    );
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

