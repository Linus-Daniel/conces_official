// app/api/delete-image/route.ts
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { publicId } = await request.json();
    
    if (!publicId) {
      return NextResponse.json(
        { message: 'No public ID provided' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { message: 'Error deleting image', error: (error as Error).message },
      { status: 500 }
    );
  }
}