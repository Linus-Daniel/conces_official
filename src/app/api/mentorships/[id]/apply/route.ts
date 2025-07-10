// route: /api/mentors/request
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';

import MentorshipRequest from '@/models/MentorshipRequest';

export async function POST(req: NextRequest, { params }: {params:  Promise<{ id: string }> }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { message, mentorId } = await req.json();
    const application = await MentorshipRequest.create({
      mentorshipId: (await params).id,
      studentId: session.user.id,
      mentorId,
      message,
    });
    return NextResponse.json(application);
  } catch (error) {
    console.error('Error applying for mentorship:', error);
    return NextResponse.json({ error: 'Application failed', message:error }, { status: 500 });
  }
}

