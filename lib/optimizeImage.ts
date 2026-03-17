import sharp from "sharp";

// @ts-expect-error heic-convert does not have types
import heicConvert from "heic-convert";

/**
 * @param buffer - Image buffer to optimize
 * @returns Optimized JPEG image buffer
 */

export async function optimizeImage(
  buffer: Uint8Array,
  type: string,
): Promise<Uint8Array> {
  try {
    if (type === "image/heic" || type === "image/heif") {
      buffer = await heicConvert({
        buffer,
        format: "JPEG",
        quality: 85,
      });
    }

    const image = sharp(buffer, { failOnError: false });

    // Resize pipeline and convert to JPEG
    const pipeline = image.resize(1920, 1920, {
      fit: "inside",
      withoutEnlargement: true,
    });

    // Always return JPEG for PDF compatibility
    return await pipeline
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();
  } catch (error) {
    console.error("Error optimizing image:", error);
    return buffer; // Return original buffer on error
  }
}
