import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';
import MentorRequest from '@/models/MentorRequest';

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'alumni') {
    console.log("[DEBUG] Unauthorized access attempt");
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    primaryExpertise,
    secondaryExpertise,
    skills,
    style,
    preferredTimes,
    motivation,
    menteeCount,
    acceptedTerms,
  } = body;

  // Debug log: received payload
  console.log("[DEBUG] Mentor request payload:", body);

  const missingFields = [];

  if (!primaryExpertise) missingFields.push("primaryExpertise");
  if (!skills) missingFields.push("skills");
  if (!style) missingFields.push("style");
  if (!preferredTimes) missingFields.push("preferredTimes");
  if (!motivation) missingFields.push("motivation");
  if (!acceptedTerms) missingFields.push("acceptedTerms");

  if (missingFields.length > 0) {
    console.warn("[DEBUG] Missing fields:", missingFields);
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const existing = await MentorRequest.findOne({
      userId: session.user.id,
      status: { $in: ['pending', 'approved'] }
    });

    if (existing) {
      console.warn("[DEBUG] Duplicate request detected for user:", session.user.id);
      return NextResponse.json({ error: 'Request already submitted or approved' }, { status: 400 });
    }

    const newRequest = await MentorRequest.create({
      userId: session.user.id,
      primaryExpertise,
      secondaryExpertise,
      skills: skills.split(',').map((s: string) => s.trim()),
      style,
      preferredTimes,
      motivation,
      menteeCount,
      acceptedTerms,
    });

    console.log("[DEBUG] Mentor request created:", newRequest._id);

    return NextResponse.json({ message: 'Mentor request submitted', data: newRequest });
  } catch (error) {
    console.error("[ERROR] Failed to submit mentor request:", error);
    return NextResponse.json({ error: 'Failed to submit mentor request' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !['admin', 'branch-admin'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const requests = await MentorRequest.find()
      .populate('userId', 'fullName email avatar') // optional
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: requests });
  } catch (error) {
    console.error("[ERROR] Failed to fetch mentor requests:", error);
    return NextResponse.json({ error: 'Failed to fetch mentor requests' }, { status: 500 });
  }
}
