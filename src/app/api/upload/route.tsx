import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // e.g. 'avatars', 'events', 'blogs'

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    if (!type) {
      return NextResponse.json({ message: 'Missing upload type' }, { status: 400 });
    }

    // Optional: validate allowed folder types
    const allowedFolders = ['avatars', 'events', 'blogs', 'resources', 'posts'];
    if (!allowedFolders.includes(type)) {
      return NextResponse.json({ message: 'Invalid upload type' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: type, // dynamic folder
          public_id: `${session.user.id}-${Date.now()}`,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Error uploading file', error: (error as Error).message },
      { status: 500 }
    );
  }
}
