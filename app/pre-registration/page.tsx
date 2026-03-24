"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { FileUploadField } from "@/components/FileUploadField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useQueries";
import { formContent } from "@/data/tourContent";
import { CheckCircle, Home, Loader2, LoaderCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  registrationNo: string;
  batchNo: string;
  contactNo: string;
  preRegAmount: string;
  preRegMethod: string;
  proofOfPayment?: File;
  nidNo: string;
  nidFrontSide?: File;
  nidBackSide?: File;
  studentIdFrontSide?: File;
  studentIdBackSide?: File;
  comment?: string;
}

export default function FormPage() {
  const { lang } = useLanguage();
  const t = formContent[lang] || formContent.en;
  const isBn = lang === "bn";
  const [loading, setLoading] = useState(false);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [fileSizes, setFileSizes] = useState<Record<string, number>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      registrationNo: "",
      batchNo: "",
      contactNo: "",
      preRegAmount: "",
      preRegMethod: "",
      proofOfPayment: undefined,
      nidNo: "",
      nidFrontSide: undefined,
      nidBackSide: undefined,
      studentIdFrontSide: undefined,
      studentIdBackSide: undefined,
      comment: "",
    } as FormData,
    onSubmit: async ({ value }) => {
      setLoading(true);
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (
            val &&
            typeof val === "object" &&
            "name" in val &&
            "size" in val
          ) {
            formData.append(key, val);
          } else {
            formData.append(key, String(val));
          }
        }
      });

      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Response:", data);

        if (response.ok) {
          setShowSuccessModal(true);
          form.reset();
          setFileNames({});
          setFileSizes({});
        } else {
          if (data.error.includes("E11000 duplicate key error"))
            toast.error("Registration Number already used");
          else toast.error("Error submitting form");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error submitting form");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setFieldValue(fieldName as any, file);
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
      setFileSizes((prev) => ({
        ...prev,
        [fieldName]: file.size,
      }));
    }
  };

  const clearFile = (fieldName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setFieldValue(fieldName as any, undefined);
    setFileNames((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    setFileSizes((prev) => ({
      ...prev,
      [fieldName]: 0,
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
            Complete Your Pre-Registration
          </h1>

          <p className="text-destructive pt-2 font-semibold">
            All information should be in English
          </p>
          <p className="text-center text-muted-foreground text-sm">
            All fields marked with <span className="text-destructive">*</span>{" "}
            are required
          </p>

          <p
            className={`bg-destructive/50 rounded-md text-sm text-foreground-muted font-bold p-2 px-4 mt-4 ${isBn ? "font-bangla" : "font-sans"}`}
          >
            {t.nidNote}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Personal Information Section */}
            <FieldGroup>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-linear-to-b from-primary to-primary rounded" />
                <h2 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h2>
              </div>

              <form.Field name="name">
                {(field) => (
                  <Field>
                    <FieldLabel>
                      Full Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <input
                      placeholder="Enter your full name"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </Field>
                )}
              </form.Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field name="registrationNo">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        Registration Number{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <input
                        placeholder="20010110XX"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9-]/g, "");
                          field.handleChange(value);
                        }}
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="batchNo">
                  {() => (
                    <Field>
                      <FieldLabel>
                        Batch No <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        value={form.getFieldValue("batchNo")}
                        onChange={(e) =>
                          form.setFieldValue("batchNo", e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="">Select Batch</option>
                        {Array.from({ length: 11 }, (_, i) => i + 1).map(
                          (batch) => (
                            <option key={batch} value={batch.toString()}>
                              {batch}
                              {batch === 1
                                ? "st"
                                : batch === 2
                                  ? "nd"
                                  : batch === 3
                                    ? "rd"
                                    : "th"}{" "}
                              Batch
                            </option>
                          ),
                        )}
                      </select>
                    </Field>
                  )}
                </form.Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field name="contactNo">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        Contact No <span className="text-destructive">*</span>
                      </FieldLabel>
                      <input
                        placeholder="Enter your active Contact No"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.handleChange(value);
                        }}
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="nidNo">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        National ID Card Number{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <input
                        placeholder="Enter your 10 or 17 digit NID No"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.handleChange(value);
                        }}
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            {/* Payment Information Section */}
            <FieldGroup>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-linear-to-b from-secondary to-secondary rounded" />
                <h2 className="text-lg font-semibold text-foreground">
                  Payment Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field name="preRegMethod">
                  {() => (
                    <Field>
                      <FieldLabel>
                        Pre-Registration Method{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <select
                        value={form.getFieldValue("preRegMethod")}
                        onChange={(e) =>
                          form.setFieldValue("preRegMethod", e.target.value)
                        }
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="">Select Payment Method</option>
                        <option value="bKash">bKash</option>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </Field>
                  )}
                </form.Field>

                <form.Field name="preRegAmount">
                  {(field) => (
                    <Field>
                      <FieldLabel>
                        Pre-Registered Amount (Minimum ৳3000)
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <input
                        type="text"
                        placeholder="3000"
                        value={field.state.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, "");
                          const parts = value.split(".");
                          const validated =
                            parts.length > 2
                              ? parts[0] + "." + parts.slice(1).join("")
                              : value;
                          field.handleChange(validated);
                        }}
                        required
                        className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            <form.Field name="proofOfPayment">
              {() => (
                <FileUploadField
                  fieldName="proofOfPayment"
                  label="Proof of Payment"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.pdf"
                  required
                  fileName={fileNames.proofOfPayment}
                  fileSize={fileSizes.proofOfPayment}
                  onFileChange={handleFileChange}
                  onClearFile={clearFile}
                  inputId="proofOfPayment"
                />
              )}
            </form.Field>

            {/* Document Upload Section */}
            <FieldGroup>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-linear-to-b from-accent to-accent rounded" />
                <h2 className="text-lg font-semibold text-foreground">
                  Document Uploads
                </h2>
              </div>

              {/* NID Documents */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="nidFrontSide">
                  {() => (
                    <FileUploadField
                      fieldName="nidFrontSide"
                      label="National ID Card (Front)"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      required
                      fileName={fileNames.nidFrontSide}
                      fileSize={fileSizes.nidFrontSide}
                      onFileChange={handleFileChange}
                      onClearFile={clearFile}
                      inputId="nidFrontSide"
                    />
                  )}
                </form.Field>

                <form.Field name="nidBackSide">
                  {() => (
                    <FileUploadField
                      fieldName="nidBackSide"
                      label="National ID Card (Back)"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      required
                      fileName={fileNames.nidBackSide}
                      fileSize={fileSizes.nidBackSide}
                      onFileChange={handleFileChange}
                      onClearFile={clearFile}
                      inputId="nidBackSide"
                    />
                  )}
                </form.Field>
              </div>

              {/* Student ID Documents */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="studentIdFrontSide">
                  {() => (
                    <FileUploadField
                      fieldName="studentIdFrontSide"
                      label="Student ID Card (Front)"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      required
                      fileName={fileNames.studentIdFrontSide}
                      fileSize={fileSizes.studentIdFrontSide}
                      onFileChange={handleFileChange}
                      onClearFile={clearFile}
                      inputId="studentIdFrontSide"
                    />
                  )}
                </form.Field>

                <form.Field name="studentIdBackSide">
                  {() => (
                    <FileUploadField
                      fieldName="studentIdBackSide"
                      label="Student ID Card (Back)"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      required
                      fileName={fileNames.studentIdBackSide}
                      fileSize={fileSizes.studentIdBackSide}
                      onFileChange={handleFileChange}
                      onClearFile={clearFile}
                      inputId="studentIdBackSide"
                    />
                  )}
                </form.Field>
              </div>
            </FieldGroup>

            {/* Comments Section */}
            <FieldGroup>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-linear-to-b from-primary to-primary rounded" />
                <h2 className="text-lg font-semibold text-foreground">
                  Additional Information
                </h2>
              </div>

              <form.Field name="comment">
                {(field) => (
                  <Field>
                    <FieldLabel>Comments</FieldLabel>
                    <textarea
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-input border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                      placeholder="Add any additional comments (optional)"
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 text-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </form>
        </div>

        {/* Success Modal Overlay */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-full animate-pulse" />
                  <CheckCircle className="w-20 h-20 text-green-600 dark:text-green-400 relative" />
                </div>
              </div>
              {/* Heading */}
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">
                Form Submitted Successfully!
              </h2>
              {/* Description */}
              <p className="text-center text-muted-foreground mb-6">
                Thank you for your submission. Your form has been received and
                processed.
              </p>

              <Link
                href="/"
                className="px-4 py-3 flex gap-2 items-center justify-center w-50 mx-auto border border-primary rounded-md text-primary hover:bg-primary/10 transition-colors bg-foreground/20"
              >
                <Home />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
