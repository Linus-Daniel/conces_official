// route: /api/mentors/request
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';
import AlumniProfile from '@/models/Alunmi';


// route: /api/mentorships [POST]
import Mentorship from '@/models/Mentorship';

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'alumni') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { description, topics } = await req.json();
    const mentorship = await Mentorship.create({
      mentorId: session.user.id,
      description,
      topics,
    });
    return NextResponse.json(mentorship);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mentorship' }, { status: 500 });
  }
}