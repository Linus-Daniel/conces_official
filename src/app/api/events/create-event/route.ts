import { NextResponse } from "next/server";
import Events, { IEvent } from "@/models/Events";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

// Type for the request body
interface CreateEventRequest {
  title: string;
  category: string;
  chapter?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  featured?: boolean;
  image: string;
  hasRegistration?: boolean;
  approved?: boolean;
  requirements?: string;
  registrationLink?: string;
  contactEmail?: string;
  contactPhone?: string;
}

// Type for mongoose validation errors
interface MongooseValidationError extends Error {
  name: "ValidationError";
  errors: {
    [key: string]: {
      message: string;
      path: string;
      value: any;
    };
  };
}

// Type guard to check if error is mongoose validation error
function isMongooseValidationError(
  error: unknown
): error is MongooseValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as any).name === "ValidationError" &&
    "errors" in error
  );
}

// Type guard to check if error has message property
function isErrorWithMessage(error: unknown): error is Error {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Check if user is admin or chapter-admin
  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const data: CreateEventRequest = await request.json();

    // Generate a unique ID for the event
    const id = `event-${Date.now()}`;

    // Validate registration fields if hasRegistration is true
    if (data.hasRegistration) {
      const requiredRegistrationFields: (keyof CreateEventRequest)[] = [
        "registrationLink",
        "contactEmail",
        "contactPhone",
      ];
      const missingFields = requiredRegistrationFields.filter((field) => {
        const value = data[field];
        return !value || (typeof value === "string" && value.trim() === "");
      });

      if (missingFields.length > 0) {
        return NextResponse.json(
          {
            message: "Missing required registration fields",
            missingFields: missingFields,
          },
          { status: 400 }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (data.contactEmail && !emailRegex.test(data.contactEmail)) {
        return NextResponse.json(
          { message: "Invalid email format for contact email" },
          { status: 400 }
        );
      }

      // Validate URL format for registration link
      try {
        if (data.registrationLink) {
          new URL(data.registrationLink);
        }
      } catch (urlError) {
        return NextResponse.json(
          { message: "Invalid URL format for registration link" },
          { status: 400 }
        );
      }
    }

    // Prepare event data
    const eventData: Partial<IEvent> = {
      id,
      title: data.title,
      category: data.category,
      chapter: data.chapter,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
      longDescription: data.longDescription,
      featured: data.featured || false,
      image: data.image,
      hasRegistration: data.hasRegistration || false,
      approved: data.approved || false,
      requirements: data.requirements,
    };

    // Only add registration fields if hasRegistration is true
    if (data.hasRegistration) {
      eventData.registrationLink = data.registrationLink;
      eventData.contactEmail = data.contactEmail;
      eventData.contactPhone = data.contactPhone;
    }

    // Create new event
    const newEvent = new Events(eventData);

    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);

    // Handle mongoose validation errors
    if (isMongooseValidationError(error)) {
      const validationErrors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));

      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : "An unknown error occurred";

    return NextResponse.json(
      { message: "Error creating event", error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT endpoint for updating events
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  // Check if user is admin or chapter-admin
  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const data = await request.json();
    const { eventId, ...updateData } = data;

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required for updates" },
        { status: 400 }
      );
    }

    // Validate registration fields if hasRegistration is true
    if (updateData.hasRegistration) {
      const requiredRegistrationFields = [
        "registrationLink",
        "contactEmail",
        "contactPhone",
      ];
      const missingFields = requiredRegistrationFields.filter(
        (field) => !updateData[field] || updateData[field].trim() === ""
      );

      if (missingFields.length > 0) {
        return NextResponse.json(
          {
            message: "Missing required registration fields",
            missingFields: missingFields,
          },
          { status: 400 }
        );
      }
    }

    // If hasRegistration is false, remove registration fields
    if (!updateData.hasRegistration) {
      updateData.registrationLink = undefined;
      updateData.contactEmail = undefined;
      updateData.contactPhone = undefined;
    }

    // Update the event
    const updatedEvent = await Events.findOneAndUpdate(
      { id: eventId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error:Error | any) {
    console.error("Error updating event:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));

      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error updating event", error: error.message },
      { status: 500 }
    );
  }
}
