import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import User from "@/models/User";

export async function PUT(req) {
  await connectDB();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const { botPersona } = await req.json();
  const user = await User.findByIdAndUpdate(userId, { botPersona }, { new: true }).select(
    "-password"
  );

  return NextResponse.json(user);
}
