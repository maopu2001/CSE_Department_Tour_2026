"use client";

import { CheckCircle, Upload, X } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

interface FileUploadFieldProps {
  fieldName: string;
  label: string;
  subLabel?: string;
  accept: string;
  required?: boolean;
  fileName?: string;
  fileSize?: number;
  maxSizeBytes?: number;
  onFileChange: (fieldName: string, file: File | null) => void;
  onClearFile: (fieldName: string) => void;
  onInvalidFile?: (fieldName: string, message: string) => void;
  inputId: string;
}

export function FileUploadField({
  fieldName,
  label,
  subLabel,
  accept,
  required = false,
  fileName,
  fileSize,
  maxSizeBytes,
  onFileChange,
  onClearFile,
  onInvalidFile,
  inputId,
}: FileUploadFieldProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedFile = files?.[0];

    if (!selectedFile) return;

    if (maxSizeBytes && selectedFile.size > maxSizeBytes) {
      onFileChange(fieldName, null);
      e.target.value = "";
      toast.error(
        <div
          className="cursor-pointer w-full"
          onClick={() => {
            document
              .getElementById("compression-tools")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="font-semibold">
            File must be {formatFileSize(maxSizeBytes)} or less.
          </div>
          <div className="text-xs opacity-80">
            Click here to use compression tools below.
          </div>
        </div>,
        {
          duration: 3000,
        },
      );
      return;
    }

    onFileChange(fieldName, selectedFile);
  };

  const handleClear = () => {
    onClearFile(fieldName);
    // Reset the input
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
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
            className="h-20 flex items-center justify-center px-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
          >
            {fileName ? (
              <div className="flex items-center gap-2 sm:gap-5 min-w-0 flex-1">
                <CheckCircle className="size-5 text-green-600 shrink-0" />
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
              <div className="flex flex-col items-center gap-1">
                <Upload className="size-5 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">
                  Click to upload
                </span>
                {subLabel && (
                  <span className="flex flex-col items-center justify-center text-[10px] sm:text-xs text-destructive/90 -mt-1">
                    {subLabel}
                  </span>
                )}
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
