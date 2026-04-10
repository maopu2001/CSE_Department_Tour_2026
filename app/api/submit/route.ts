import { NextRequest, NextResponse } from "next/server";
import { createPDF } from "@/lib/pdf";
import { connectDB } from "@/lib/db";
import { saveFormSubmissionWithPDFs } from "@/lib/submission";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

type formDataProp = {
  name: string;
  registrationNo: string;
  batchNo: string;
  contactNo: string;
  preRegAmount: string;
  preRegMethod: string;
  proofOfPayment: File;
  nidNo: string;
  nidFrontSide: File;
  nidBackSide: File;
  studentIdFrontSide: File;
  studentIdBackSide: File;
  comment?: string;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    if (
      !formData.get("name") ||
      !formData.get("registrationNo") ||
      !formData.get("batchNo") ||
      !formData.get("contactNo") ||
      !formData.get("preRegAmount") ||
      !formData.get("preRegMethod") ||
      !formData.get("proofOfPayment") ||
      !formData.get("nidNo") ||
      !formData.get("nidFrontSide") ||
      !formData.get("nidBackSide") ||
      !formData.get("studentIdFrontSide") ||
      !formData.get("studentIdBackSide")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const data: formDataProp = {
      name: formData.get("name") as string,
      registrationNo: formData.get("registrationNo") as string,
      batchNo: formData.get("batchNo") as string,
      contactNo: formData.get("contactNo") as string,
      preRegMethod: formData.get("preRegMethod") as string,
      preRegAmount: formData.get("preRegAmount") as string,
      proofOfPayment: formData.get("proofOfPayment") as File,
      nidNo: formData.get("nidNo") as string,
      nidFrontSide: formData.get("nidFrontSide") as File,
      nidBackSide: formData.get("nidBackSide") as File,
      studentIdFrontSide: formData.get("studentIdFrontSide") as File,
      studentIdBackSide: formData.get("studentIdBackSide") as File,
      comment: (formData.get("comment") as string) || undefined,
    };

    const uploadFields: Array<
      keyof Pick<
        formDataProp,
        | "proofOfPayment"
        | "nidFrontSide"
        | "nidBackSide"
        | "studentIdFrontSide"
        | "studentIdBackSide"
      >
    > = [
      "proofOfPayment",
      "nidFrontSide",
      "nidBackSide",
      "studentIdFrontSide",
      "studentIdBackSide",
    ];

    for (const field of uploadFields) {
      if (data[field].size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} must be 2 MB or less`,
          },
          { status: 400 },
        );
      }
    }

    const proofPDF = await createPDF({
      single: true,
      fileName: `proof_${data.registrationNo}`,
      front: data.proofOfPayment,
      back: data.proofOfPayment,
    });

    const nidPDF = await createPDF({
      fileName: `nid_${data.nidNo}`,
      front: data.nidFrontSide,
      back: data.nidBackSide,
    });

    const studentIdPDF = await createPDF({
      fileName: `studentId_${data.registrationNo}`,
      front: data.studentIdFrontSide,
      back: data.studentIdBackSide,
    });

    // Save submission to database
    await connectDB();
    const result = await saveFormSubmissionWithPDFs(
      {
        name: data.name,
        registrationNo: data.registrationNo,
        batchNo: data.batchNo,
        preRegMethod: data.preRegMethod,
        contactNo: data.contactNo,
        preRegAmount: data.preRegAmount,
        nidNo: data.nidNo,
        comment: data.comment,
      },
      {
        proofPDF: Buffer.from(proofPDF.pdfBytes),
        nidPDF: Buffer.from(nidPDF.pdfBytes),
        studentIdPDF: Buffer.from(studentIdPDF.pdfBytes),
      },
    );

    const totalSizeMB =
      (Buffer.from(proofPDF.pdfBytes).length +
        Buffer.from(nidPDF.pdfBytes).length +
        Buffer.from(studentIdPDF.pdfBytes).length) /
      (1024 * 1024);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        totalSizeMB: {
          total: totalSizeMB.toFixed(2) + " MB",
          proof:
            (Buffer.from(proofPDF.pdfBytes).length / (1024 * 1024)).toFixed(2) +
            " MB",
          nid:
            (Buffer.from(nidPDF.pdfBytes).length / (1024 * 1024)).toFixed(2) +
            " MB",
          studentId:
            (Buffer.from(studentIdPDF.pdfBytes).length / (1024 * 1024)).toFixed(
              2,
            ) + " MB",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing form",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
