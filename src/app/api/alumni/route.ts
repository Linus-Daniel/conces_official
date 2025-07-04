import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import AlumniProfile from '@/models/Alunmi';
import User from '@/models/User';
import Connection from '@/models/Connect';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'alumni') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id })
      .populate('userId', 'fullName email avatar role branch');

    const connections = await Connection.find({ 
      $or: [
        { alumniId: session.user.id },
        { connectedUserId: session.user.id }
      ],
      status: 'connected'
    }).populate('alumniId connectedUserId', 'fullName avatar currentRole');

    const mentorshipRequests = await Connection.find({
      alumniId: session.user.id,
      status: 'pending'
    }).populate('connectedUserId', 'fullName avatar');

    return NextResponse.json({
      profile: alumniProfile,
      connections,
      mentorshipRequests
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch alumni data' },
      { status: 500 }
    );
  }
}