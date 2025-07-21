// route: /api/mentors/request
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';

import MentorshipApplication from '@/models/MentorshipApplication';

export async function POST(req: NextRequest, { params }: {params:  Promise<{ id: string }> }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { message, mentorId } = await req.json();
    const application = await MentorshipApplication.create({
      mentorship: (await params).id,
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
export async function GET(req:NextRequest, { params }: {params:  Promise<{ id: string }> }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  // if (!session || !session?.user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    const applications = await MentorshipApplication.find({ mentorship: (await params).id })
      .populate('mentorId', 'name expertise')
      .populate('studentId', 'name email');

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching mentorship applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
  
}


