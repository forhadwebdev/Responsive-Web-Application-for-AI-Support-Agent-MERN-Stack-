import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Conversation from "@/models/Conversation";

export async function GET(req) {
  await connectDB();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const conversations = await Conversation.find({ owner: userId }).sort({ updatedAt: -1 });
  return NextResponse.json(conversations);
}
