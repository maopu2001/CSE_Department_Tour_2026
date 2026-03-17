"use client";

import { CheckCircle, Upload, X } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";

interface FileUploadFieldProps {
  fieldName: string;
  label: string;
  accept: string;
  required?: boolean;
  fileName?: string;
  fileSize?: number;
  onFileChange: (fieldName: string, file: File | null) => void;
  onClearFile: (fieldName: string) => void;
  inputId: string;
}

export function FileUploadField({
  fieldName,
  label,
  accept,
  required = false,
  fileName,
  fileSize,
  onFileChange,
  onClearFile,
  inputId,
}: FileUploadFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileChange(fieldName, files[0]);
    }
  };

  const handleClear = () => {
    onClearFile(fieldName);
    // Reset the input
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Field>
      <FieldLabel>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      <div>
        {/* Upload Area */}
        <div className="relative">
          <input
            type="file"
            onChange={handleChange}
            accept={accept}
            required={required}
            className="sr-only"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            {fileName ? (
              <div className="flex items-center gap-2 sm:gap-5 min-w-0 flex-1 h-10">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {fileName}
                  </p>
                  {fileSize && (
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileSize)}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-10 flex flex-col items-center gap-2">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload
                </span>
              </div>
            )}
          </label>
          {fileName && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleClear();
              }}
              className="absolute top-2 right-2 p-1.5 bg-destructive/20 hover:bg-destructive/40 rounded-full transition-colors shrink-0"
              title="Remove file"
            >
              <X className="w-4 h-4 text-destructive" />
            </button>
          )}
        </div>
      </div>
    </Field>
  );
}
