'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  onUpload: (result: any) => void;
  folder?: string;
  children: React.ReactNode;
}

export default function ImageUpload({ onUpload, folder, children }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        folder: folder || 'uploads',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
      }}
      onUpload={(result: any, widget) => {
        if (result.event === 'success') {
          onUpload(result.info);
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            disabled={isUploading}
            className="relative"
          >
            {isUploading ? 'Uploading...' : children}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}