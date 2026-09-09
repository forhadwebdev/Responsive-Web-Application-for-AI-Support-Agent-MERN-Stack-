import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// In serverless environments (Vercel), API routes can be invoked many
// times without a persistent process, so we cache the connection on
// the global object to avoid creating a new one on every request.
let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set in your environment variables");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
