"use client";
import { cn } from "@/lib/utils";
import { MountainIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface FileUploadProps extends Omit<DropzoneOptions, "onDrop"> {
  isLoading?: boolean;
  onFileChange: (preview?: string) => void;
  value?: string;
  className?: string;
  previewHeight?: number;
  placeholder?: {
    icon?: React.ReactNode;
    text?: string;
  };
  setCoverFile: (file: File) => void;
}

const FileUpload = ({
  isLoading,
  onFileChange,
  setCoverFile,
  value,
  className,
  previewHeight = 400,
  placeholder = {
    icon: <MountainIcon className="w-10 h-10 text-muted-foreground" />,
    text: "No image selected",
  },
  ...dropzoneProps
}: FileUploadProps) => {
  const [imagePreview, setImagePreview] = useState(value || "");

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    onFileChange(preview);
    setCoverFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 8 * 1024 * 1024,
    maxFiles: 1,
    ...dropzoneProps,
  });

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the photo here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop a photo here, or click to select a photo
          </p>
        )}
      </div>
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="preview"
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "rounded-lg object-cover w-full",
            isLoading && "animate-pulse grayscale"
          )}
          style={{ height: previewHeight }}
        />
      ) : (
        <div
          className="flex flex-col items-center gap-4 justify-center border border-border rounded-lg"
          style={{ height: previewHeight }}
        >
          {placeholder.icon}
          <p className="text-lg font-semibold text-muted-foreground">
            {placeholder.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
