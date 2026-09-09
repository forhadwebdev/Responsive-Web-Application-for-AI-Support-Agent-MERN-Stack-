import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";
import Conversation from "@/models/Conversation";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ message: "Not authorized" }, { status: 401 });

  const totalConversations = await Conversation.countDocuments({ owner: userId });
  const openConversations = await Conversation.countDocuments({ owner: userId, status: "open" });
  const escalated = await Conversation.countDocuments({ owner: userId, status: "escalated" });
  const user = await User.findById(userId).select(
    "plan monthlyMessageLimit messagesUsedThisMonth"
  );

  return NextResponse.json({
    totalConversations,
    openConversations,
    escalated,
    plan: user.plan,
    messagesUsedThisMonth: user.messagesUsedThisMonth,
    monthlyMessageLimit: user.monthlyMessageLimit,
  });
}
