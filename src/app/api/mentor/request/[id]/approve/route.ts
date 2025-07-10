import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';
import MentorRequest from '@/models/MentorRequest';
import AlumniProfile from '@/models/Alunmi';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('--- [MENTOR REQUEST PATCH START] ---');

  await dbConnect();
  console.log('[✓] Connected to DB');

  const session = await getServerSession(authOptions);
  console.log('[SESSION]', session);

  if (!session || !['admin', 'branch-admin'].includes(session.user.role)) {
    console.warn('[AUTH WARNING] Unauthorized access attempt', {
      role: session?.user.role,
      user: session?.user.email,
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  console.log('[PARAMS]', { id });

  let body;
  try {
    body = await request.json();
    console.log('[REQUEST BODY]', body);
  } catch (err) {
    console.error('[ERROR] Invalid JSON body:', err);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { status } = body;

  if (!['approved', 'rejected'].includes(status)) {
    console.warn('[INVALID STATUS]', status);
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const mentorRequest = await MentorRequest.findById(id);
    if (!mentorRequest) {
      console.warn('[NOT FOUND] MentorRequest with ID not found:', id);
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    console.log('[FOUND] MentorRequest:', {
      id: mentorRequest._id,
      alumniId: mentorRequest.userId,
      currentStatus: mentorRequest.status,
    });

    mentorRequest.status = status;
    await mentorRequest.save();
    console.log(`[✓] MentorRequest status updated to "${status}"`);

    // ✅ Update alumni profile if approved
    let updatedProfile = null;
    if (status === 'approved') {
      updatedProfile = await AlumniProfile.findOneAndUpdate(
        { userId: mentorRequest.userId },
        { $set: { isMentor: true } },
        { new: true }
      );

      if (!updatedProfile) {
        console.error('[ERROR] Failed to update isMentor field on alumni profile');
        return NextResponse.json({ error: 'Failed to update alumni profile' }, { status: 500 });
      }

      console.log('[✓] AlumniProfile updated:', {
        userId: updatedProfile.userId.toString(),
        isMentor: updatedProfile.isMentor,
      });
    } else {
      console.log('[INFO] MentorRequest was rejected — no profile update necessary');
    }

    console.log('--- [MENTOR REQUEST PATCH SUCCESS] ---');

    return NextResponse.json({
      message: `Mentor request ${status}`,
      mentorRequest,
      ...(updatedProfile && { updatedProfile }),
    });
  } catch (error) {
    console.error('[ERROR] Mentor PATCH failure:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
