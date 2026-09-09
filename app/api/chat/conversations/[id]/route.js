import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Conversation from "@/models/Conversation";

export async function GET(req, { params }) {
  await connectDB();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const conversation = await Conversation.findOne({ _id: params.id, owner: userId });
  if (!conversation) {
    return NextResponse.json({ message: "Conversation not found" }, { status: 404 });
  }

  return NextResponse.json(conversation);
}
