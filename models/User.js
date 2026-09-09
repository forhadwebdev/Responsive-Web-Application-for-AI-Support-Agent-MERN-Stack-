import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    businessName: { type: String, required: true, trim: true },
    plan: {
      type: String,
      enum: ["free", "pro", "business"],
      default: "free",
    },
    monthlyMessageLimit: { type: Number, default: 50 },
    messagesUsedThisMonth: { type: Number, default: 0 },
    botPersona: {
      type: String,
      default:
        "You are a friendly, concise customer support assistant. Answer clearly and offer to escalate to a human when unsure.",
    },
  },
  { timestamps: true }
);

// Prevents "OverwriteModelError" in Next.js dev mode hot-reload
export default mongoose.models.User || mongoose.model("User", userSchema);
