import PreRegInfo from "./models/PreRegInfo";
import { storePDFInGridFS } from "./gridfs";

interface FormSubmissionData {
  name: string;
  registrationNo: string;
  batchNo: string;
  contactNo: string;
  preRegAmount: string;
  preRegMethod: string;
  nidNo: string;
  comment?: string;
}

interface PDFData {
  proofPDF: Buffer;
  nidPDF: Buffer;
  studentIdPDF: Buffer;
}

/**
 * Save form submission to database with PDF files stored in GridFS
 * @param formData - Form data
 * @param pdfData - PDF buffers
 * @returns Created document
 */
export async function saveFormSubmissionWithPDFs(
  formData: FormSubmissionData,
  pdfData: PDFData,
) {
  try {
    // Store PDFs in GridFS
    const proofPDFId = await storePDFInGridFS(
      `proof_${formData.registrationNo}.pdf`,
      pdfData.proofPDF,
      { type: "proof_of_payment" },
    );

    const nidPDFId = await storePDFInGridFS(
      `nid_${formData.nidNo}.pdf`,
      pdfData.nidPDF,
      { type: "nid_document" },
    );

    const studentIdPDFId = await storePDFInGridFS(
      `studentId_${formData.registrationNo}.pdf`,
      pdfData.studentIdPDF,
      { type: "student_id_document" },
    );

    // Create form submission document
    const submission = new PreRegInfo({
      ...formData,
      proofPDF: proofPDFId,
      nidPDF: nidPDFId,
      studentIdPDF: studentIdPDFId,
    });

    await submission.save();

    return {
      success: true,
      submissionId: submission._id,
      message: "Form submitted successfully",
    };
  } catch (error) {
    throw error;
  }
}
