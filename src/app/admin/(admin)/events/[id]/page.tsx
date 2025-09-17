// app/admin/events/[id]/page.tsx
"use client";

import EventForm from "@/components/admin/EventForm";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { extractPublicId } from "@/lib/cloudinary-client";

export default function EditEventPage() {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          console.error("Failed to fetch event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Handle image upload if a new file was selected
      const imageFile = formData.get("file") as File;
      let imageUrl = event.image;
      let oldPublicId = null;

      if (imageFile && imageFile.size > 0) {
        // Get old public ID if exists
        if (event.image) {
          oldPublicId = extractPublicId(event.image);
        }

        const uploadFormData = new FormData();
        uploadFormData.append("file", imageFile);
        uploadFormData.append("type", "events");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const { secure_url } = await uploadResponse.json();
        imageUrl = secure_url;
      }

      // Prepare event data
      const eventData = {
        title: formData.get("title"),
        category: formData.get("category"),
        chapter: formData.get("chapter"),
        date: formData.get("date"),
        time: formData.get("time"),
        location: formData.get("location"),
        description: formData.get("description"),
        longDescription: formData.get("longDescription"),
        featured: formData.get("featured") === "on",
        image: imageUrl,
        registrationLink: formData.get("registrationLink"),
        contactEmail: formData.get("contactEmail"),
        contactPhone: formData.get("contactPhone"),
        requirements: formData.get("requirements"),
      };

      // Update event
      const response = await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok && oldPublicId) {
        // Delete old image after successful update
        await fetch("/api/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId: oldPublicId }),
        });
        router.push("/admin/events");
      } else if (response.ok) {
        router.push("/admin/events");
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-royal-800 mb-6">Edit Event</h2>
      <EventForm
        event={event}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
