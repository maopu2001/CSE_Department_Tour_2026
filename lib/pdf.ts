import { PDFDocument } from "pdf-lib";
import { optimizeImage } from "./optimizeImage";

interface PDFOptions {
  single?: boolean; // Optional type field for future use
  fileName: string;
  front: File;
  back: File;
}

/**
 * Converts image files to a PDF document
 * @param options - Object containing fileName, front image, and back image
 * @returns PDFDocument object
 */
export async function createPDF(
  options: PDFOptions,
): Promise<{ pdfBytes: Uint8Array; fileName: string }> {
  const { single = false, fileName, front, back } = options;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  try {
    // If single is true, only process the front file and ignore the back file
    if (single) {
      const buffer = await fileToBuffer(front);
      let pdfBytes;
      if (front.type === "application/pdf") pdfBytes = new Uint8Array(buffer);
      else {
        const buffer = await fileToBuffer(front);
        const optimizedBuffer = await optimizeImage(buffer, front.type);
        const image = await pdfDoc.embedJpg(optimizedBuffer);
        const dims = image.scale(0.8);
        const page = pdfDoc.addPage([dims.width, dims.height]);
        page.drawImage(image, {
          x: (page.getWidth() - dims.width) / 2,
          y: (page.getHeight() - dims.height) / 2,
          width: dims.width,
          height: dims.height,
        });
        pdfBytes = await pdfDoc.save();
      }

      return {
        pdfBytes,
        fileName: `${fileName}.pdf`,
      };
    }

    // Convert File objects to Uint8Array
    const frontBuffer = await fileToBuffer(front);
    const backBuffer = await fileToBuffer(back);

    // Optimize images to JPEG format
    const optimizedFrontBuffer = await optimizeImage(frontBuffer, front.type);
    const optimizedBackBuffer = await optimizeImage(backBuffer, back.type);

    // Embed JPEG images in PDF
    const frontImage = await pdfDoc.embedJpg(optimizedFrontBuffer);
    const backImage = await pdfDoc.embedJpg(optimizedBackBuffer);

    // Add pages with images
    if (frontImage) {
      const frontDims = frontImage.scale(0.8);
      const page1 = pdfDoc.addPage([frontDims.width, frontDims.height]);
      page1.drawImage(frontImage, {
        x: (page1.getWidth() - frontDims.width) / 2,
        y: (page1.getHeight() - frontDims.height) / 2,
        width: frontDims.width,
        height: frontDims.height,
      });
    }

    if (backImage) {
      const backDims = backImage.scale(0.8);
      const page2 = pdfDoc.addPage([backDims.width, backDims.height]);
      page2.drawImage(backImage, {
        x: (page2.getWidth() - backDims.width) / 2,
        y: (page2.getHeight() - backDims.height) / 2,
        width: backDims.width,
        height: backDims.height,
      });
    }

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    return {
      pdfBytes,
      fileName: `${fileName}.pdf`,
    };
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
}

/**
 * Converts a File object to a Uint8Array buffer
 * @param file - File object to convert
 * @returns Uint8Array buffer
 */
async function fileToBuffer(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
