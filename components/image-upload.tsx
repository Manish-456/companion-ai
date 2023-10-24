"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 flex flex-col justify-center items-center w-full">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="bs7jjzis"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="p-4 border-4 border-dashed border-primary rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
              alt="upload"
              fill
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
}
