// app/admin/events/new/page.tsx
"use client";

import EventForm from "@/components/admin/EventForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/axiosInstance";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Upload image if a new file was selected
      const imageFile = formData.get("file") as File;
      let imageUrl = "";

      if (imageFile && imageFile.size > 0) {
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
      // Create event
      const response = await api.post(
        "/events",
        { eventData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        router.push("/admin/events");
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-royal-800 mb-6">
        Create New Event
      </h2>
      <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
