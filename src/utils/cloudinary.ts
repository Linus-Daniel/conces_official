import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { format } from '@cloudinary/url-gen/actions/delivery';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

export function getCloudinaryImage(publicId: string) {
  return cld
    .image(publicId)
    .setDeliveryType('upload')
    .delivery(format('auto'))
    .delivery(quality('auto'))
    .toURL();
}

export function getOptimizedImage(publicId: string, width: number, height: number) {
  return cld
    .image(publicId)
    .resize(fill().width(width).height(height))
    .delivery(format('auto'))
    .delivery(quality('auto'))
    .toURL();
}

export function getAvatarImage(publicId: string, size = 100) {
  return cld
    .image(publicId)
    .resize(fill().width(size).height(size))
    .roundCorners(byRadius(size))
    .delivery(format('auto'))
    .delivery(quality('auto'))
    .toURL();
}
