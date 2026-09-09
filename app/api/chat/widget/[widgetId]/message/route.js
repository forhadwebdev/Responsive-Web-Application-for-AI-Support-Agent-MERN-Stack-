import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Conversation from "@/models/Conversation";
import { generateSupportReply } from "@/utils/openai";

// PUBLIC endpoint — the embeddable chat widget on a business's own
// website calls this. widgetId is the business owner's user id.
export async function POST(req, { params }) {
  try {
    await connectDB();
    const { widgetId } = params;
    const { conversationId, customerMessage, customerName, customerEmail } = await req.json();

    const owner = await User.findById(widgetId);
    if (!owner) return NextResponse.json({ message: "Widget not found" }, { status: 404 });

    if (owner.messagesUsedThisMonth >= owner.monthlyMessageLimit) {
      return NextResponse.json(
        { message: "This business has reached its monthly AI reply limit." },
        { status: 403 }
      );
    }

    let conversation = conversationId ? await Conversation.findById(conversationId) : null;

    if (!conversation) {
      conversation = await Conversation.create({
        owner: owner._id,
        customerName: customerName || "Website Visitor",
        customerEmail,
        messages: [],
      });
    }

    conversation.messages.push({ sender: "customer", text: customerMessage });

    const aiReply = await generateSupportReply({
      botPersona: owner.botPersona,
      history: conversation.messages.slice(-10),
      customerMessage,
    });

    conversation.messages.push({ sender: "ai", text: aiReply });
    await conversation.save();

    owner.messagesUsedThisMonth += 1;
    await owner.save();

    return NextResponse.json({ conversationId: conversation._id, reply: aiReply });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to generate reply", error: err.message },
      { status: 500 }
    );
  }
}
