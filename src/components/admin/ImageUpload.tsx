// components/admin/ImageUpload.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
    setIsUploading(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <img
              src={url}
              alt="Product image"
              className="object-cover w-full h-full"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => onRemove(url)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <CldUploadWidget
      uploadPreset="your_upload_preset" // Replace with your Cloudinary upload preset
      onUpload={onUpload}
      onOpen={() => setIsUploading(true)}
      options={{
        cloudName: 'your_cloud_name', // Replace with your Cloudinary cloud name
        cropping: false,
        sources: ['local', 'url', 'camera', 'google_drive', 'dropbox'],
        multiple: false,
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}
    </CldUploadWidget>
        
    </div>
  );
}