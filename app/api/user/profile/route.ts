import { dbAdapter } from "@/lib/database-adapter";
import { COLLECTIONS } from "@/types/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config"; // ✅ authOptions import করো

export async function PUT(request: NextRequest) {
  try {
    // Get user session with authOptions
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await request.json();
    const service = await dbAdapter.getService();

    console.log("🔄 Updating user profile:", session.user.id, userData);

    // Update user profile
    const updatedUser = await service.updateOne(
      COLLECTIONS.USERS,
      session.user.id, // user ID from session
      userData
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ Profile updated successfully");
    return NextResponse.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get user session with authOptions
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const service = await dbAdapter.getService();

    console.log("📋 Getting user profile:", session.user.id);

    // Get user profile
    const user = await service.findById(
      COLLECTIONS.USERS,
      session.user.id
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error("❌ Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}