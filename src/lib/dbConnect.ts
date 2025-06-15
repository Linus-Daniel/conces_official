import mongoose from 'mongoose';

// ✅ Replace 'conces' with your actual database name
const MONGODB_URI = 'mongodb://127.0.0.1:27017/conces';

if (!MONGODB_URI || (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://'))) {
  throw new Error('❌ Invalid MongoDB URI');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
      console.log('🔗 Connected to MongoDB');
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
