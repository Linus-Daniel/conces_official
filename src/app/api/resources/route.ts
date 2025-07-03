import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resource from '@/models/Resources';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const resources = await Resource.find({});
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error('GET /resources error:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.warn('Unauthorized access attempt - No session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = session.user.role;
    const allowedRoles = ['admin', 'branch-admin', 'alumni'];
    const branch =session?.user.branch

    if (!allowedRoles.includes(userRole)) {
      console.warn(`Forbidden access by user with role: ${userRole}`);
      return NextResponse.json({ error: 'Forbidden - Insufficient role' }, { status: 403 });
    }

    const body = await req.json();
    const requiredFields = ['title', 'description', 'thumbnail', 'type', 'author',];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { title, category,featured, description,fileUrl,videoUrl, thumbnail, type,content, tags = [], author, } = body;
    

    console.log('Creating resource:', { title,featured, branch, description, type, author, fileUrl,videoUrl, category, content });
    console.log(branch)
    const newResource = await Resource.create({
      title,
      description,
      thumbnail,
      category,
      branch,
      type,
      tags,
      author,
      fileUrl,
      featured,
      videoUrl,
      content,
    });

    console.log('Resource created successfully:', newResource._id);
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('POST /resources error:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
