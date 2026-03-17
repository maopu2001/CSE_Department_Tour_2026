import mongoose, { Schema, Document } from "mongoose";

interface IPreRegInfo extends Document {
  name: string;
  registrationNo: string;
  batchNo: string;
  contactNo: string;
  preRegAmount: string;
  proofPDF: mongoose.Types.ObjectId;
  nidNo: string;
  nidPDF: mongoose.Types.ObjectId;
  studentIdPDF: mongoose.Types.ObjectId;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PreRegInfoSchema = new Schema<IPreRegInfo>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    registrationNo: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      index: true,
    },
    batchNo: {
      type: String,
      required: [true, "Batch number is required"],
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },
    preRegAmount: {
      type: String,
      required: [true, "Pre-registration amount is required"],
    },
    proofPDF: {
      type: Schema.Types.ObjectId,
      ref: "fs.files",
      required: [true, "Proof PDF is required"],
    },
    nidNo: {
      type: String,
      required: [true, "NID number is required"],
      index: true,
    },
    nidPDF: {
      type: Schema.Types.ObjectId,
      ref: "fs.files",
      required: [true, "NID PDF is required"],
    },
    studentIdPDF: {
      type: Schema.Types.ObjectId,
      ref: "fs.files",
      required: [true, "Student ID PDF is required"],
    },
    comment: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model recompilation
const PreRegInfo =
  mongoose.models.PreRegInfo ||
  mongoose.model<IPreRegInfo>("PreRegInfo", PreRegInfoSchema);

export default PreRegInfo;
