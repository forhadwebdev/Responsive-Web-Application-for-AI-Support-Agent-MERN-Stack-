import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const user = await User.findById(userId).select("-password");
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}
