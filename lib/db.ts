import mongoose from "mongoose";
import { initializeGridFS } from "./gridfs";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection to reuse it
const cached: MongooseConnection = {
  conn: null,
  promise: null,
};

/**
 * Connect to MongoDB and initialize GridFS
 * @returns Mongoose connection
 */
export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      // Initialize GridFS after connection
      const db = mongoose.connection;
      initializeGridFS(db);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
