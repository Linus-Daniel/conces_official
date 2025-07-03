'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface FileUploadProps {
  onSuccess: (result: any) => void;
  folder?: string;
  allowedFormats?: string[];
  children: React.ReactNode;
}

export default function FileUpload({
  onSuccess,
  folder,
  allowedFormats = ['pdf,docx,xlsx,csv,zip'],
  children,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    throw new Error('Cloudinary upload preset is not defined. Please set NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.');
  }

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      options={{
        folder: folder || 'resources/files',
        sources: ['local', 'url'],
        multiple: false,
        resourceType: 'raw', // 👈 Important: allows non-images like PDFs, Excel, etc.
        clientAllowedFormats: allowedFormats, // e.g., 'pdf,docx,xlsx'
      }}
      onSuccess={(result: any) => {
        if (result?.event === 'queues-start') setIsUploading(true);
        if (result?.event === 'success') {
          setIsUploading(false);
          if (result.info) {
            console.log('FILE UPLOAD SUCCESS:', result.info);
            onSuccess(result.info);
          }
        }
        if (result?.event === 'queues-end') setIsUploading(false);
      }}
    >
      {(options) => (
        <button
          type="button"
          onClick={() => options?.open?.()}
          disabled={isUploading}
          className="relative px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : children}
        </button>
      )}
    </CldUploadWidget>
  );
}
