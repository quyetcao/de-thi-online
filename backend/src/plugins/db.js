import fp from "fastify-plugin";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env từ thư mục cha (vì bạn đang chạy node từ /src)
dotenv.config({ path: "../.env" });

export default fp(async function dbConnector(fastify, opts) {
  const mongoUri = process.env.MONGO_URI;
  console.log("📦 Connecting MongoDB to:", mongoUri);

  if (!mongoUri) {
    console.error("❌ Missing MONGO_URI in environment variables!");
    return;
  }

  try {
    // ✅ Đảm bảo trả Promise để Fastify biết khi nào kết nối xong
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // tránh treo quá lâu
    });

    console.log("✅ MongoDB connected successfully!");
    fastify.decorate("mongoose", mongoose);

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err; // ✅ QUAN TRỌNG: ném lỗi để Fastify biết plugin fail
  }
});
