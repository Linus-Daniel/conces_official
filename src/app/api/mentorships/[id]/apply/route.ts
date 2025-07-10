// route: /api/mentors/request
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';

import MentorshipRequest from '@/models/MentorshipRequest';
import Mentorship from '@/models/Mentorship';

export async function POST(req: NextRequest, { params }: {params:  Promise<{ id: string }> }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { message } = await req.json();
    const application = await MentorshipRequest.create({
      mentorshipId: (await params).id,
      studentId: session.user.id,
      mentorId: req.nextUrl.searchParams.get('mentorId'),
      message,
    });
    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: 'Application failed' }, { status: 500 });
  }
}

// route: /api/mentorships/[id]/schedule [PATCH]
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { days, time, meetingLink, additionalNotes } = await req.json();
    const mentorship = await Mentorship.findByIdAndUpdate(
      (await params).id,
      {
        schedule: { days, time, meetingLink, additionalNotes },
      },
      { new: true }
    );

    if (!mentorship) return NextResponse.json({ error: 'Mentorship not found' }, { status: 404 });

    return NextResponse.json(mentorship);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}
