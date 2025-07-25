import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params; // Await the Promise
  const mentorshipId = resolvedParams.id;

  try {
    const response = await fetch(
      `https://api.example.com/mentorships/${mentorshipId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mentorship details");
    }

    const mentorshipData = await response.json();
    return new Response(JSON.stringify(mentorshipData), { status: 200 });
  } catch (error) {
    console.error("Error fetching mentorship details:", error);
    return new Response("Failed to fetch mentorship details", { status: 500 });
  }
}
