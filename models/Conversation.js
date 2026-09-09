import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["customer", "ai", "human_agent"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customerName: { type: String, default: "Website Visitor" },
    customerEmail: { type: String },
    status: {
      type: String,
      enum: ["open", "resolved", "escalated"],
      default: "open",
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
