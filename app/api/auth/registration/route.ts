import { dbAdapter } from "@/lib/database-adapter";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    // Validate input
    const validatedData = registerSchema.parse(body);
    // Check if user already exists
    const existingUser = await dbAdapter.getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    // Create user
    const user = await dbAdapter.createUser({
      email: validatedData.email,
      name: validatedData.name,
      password: hashedPassword,
      role: "CUSTOMER",
      isActive: true,
    });
    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
  }
}
