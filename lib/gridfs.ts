import mongoose from "mongoose";
import { Readable } from "stream";

let gridFSBucket: mongoose.mongo.GridFSBucket | null = null;

/**
 * Initialize GridFS bucket
 * Call this after establishing MongoDB connection
 */
export function initializeGridFS(
  connection: mongoose.Connection,
): mongoose.mongo.GridFSBucket {
  gridFSBucket = new mongoose.mongo.GridFSBucket(connection.getClient().db());
  return gridFSBucket;
}

/**
 * Store a PDF file in GridFS
 * @param fileName - Name of the file
 * @param buffer - Buffer containing the file data
 * @param metadata - Optional metadata to store with the file
 * @returns ObjectId of the stored file
 */
export async function storePDFInGridFS(
  fileName: string,
  buffer: Uint8Array,
  metadata?: Record<string, string | number | Date>,
): Promise<mongoose.Types.ObjectId> {
  if (!gridFSBucket) {
    throw new Error("GridFS not initialized. Call initializeGridFS first.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = gridFSBucket!.openUploadStream(fileName, {
      metadata: {
        uploadedAt: new Date(),
        ...metadata,
      },
    });

    uploadStream.on("finish", () => {
      resolve(uploadStream.id);
    });

    uploadStream.on("error", (error: Error) => {
      reject(error);
    });

    // Convert buffer to stream and pipe to upload stream
    const readableStream = Readable.from([buffer]);
    readableStream.pipe(uploadStream);
  });
}

/**
 * Retrieve a PDF file from GridFS
 * @param fileId - ObjectId of the file to retrieve
 * @returns Buffer containing the file data
 */
export async function getPDFFromGridFS(
  fileId: mongoose.Types.ObjectId | string,
): Promise<Buffer> {
  if (!gridFSBucket) {
    throw new Error("GridFS not initialized. Call initializeGridFS first.");
  }

  return new Promise((resolve, reject) => {
    const downloadStream = gridFSBucket!.openDownloadStream(
      new mongoose.Types.ObjectId(fileId),
    );

    const chunks: Buffer[] = [];

    downloadStream.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    downloadStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    downloadStream.on("error", (error: Error) => {
      reject(error);
    });
  });
}

/**
 * Delete a PDF file from GridFS
 * @param fileId - ObjectId of the file to delete
 */
export async function deletePDFFromGridFS(
  fileId: mongoose.Types.ObjectId | string,
): Promise<void> {
  if (!gridFSBucket) {
    throw new Error("GridFS not initialized. Call initializeGridFS first.");
  }

  await gridFSBucket.delete(new mongoose.Types.ObjectId(fileId));
}

/**
 * Get file metadata from GridFS
 * @param fileId - ObjectId of the file
 * @returns File metadata
 */
export async function getPDFMetadata(
  fileId: mongoose.Types.ObjectId | string,
): Promise<{
  _id: mongoose.Types.ObjectId;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  contentType?: string;
  metadata?: Record<string, unknown>;
  aliases?: string[];
  md5?: string;
}> {
  if (!gridFSBucket) {
    throw new Error("GridFS not initialized. Call initializeGridFS first.");
  }

  const fileInfo = await gridFSBucket.find({
    _id: new mongoose.Types.ObjectId(fileId),
  });

  const files = await fileInfo.toArray();

  if (files.length === 0) {
    throw new Error("File not found");
  }

  return files[0];
}
