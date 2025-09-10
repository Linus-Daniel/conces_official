"use client"
import React, { useState, useEffect } from "react"
import { FaSave, FaTrash } from "react-icons/fa"
import { useRouter, useParams } from "next/navigation"
import { Resource } from "@/types"

export default function EditResource() {
  const router = useRouter()
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : ""

  const [resource, setResource] = useState<Resource | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return

    // Simulate fetching resource
    const fetchResource = async () => {
      const mockResource: Resource = {
        _id:"",
        branch:"",
        title: "Daily Devotional - June 15",
        type: "devotional",
        thumbnail:"",
        category: "Spiritual",
        description: "Daily spiritual guidance for June 15",
        content: "Lorem ipsum dolor sit amet...",
        author: "Linus Daniel",
        date: "2023-06-15",
        views: 150,
        tags: ["devotion", "daily"],
        featured: true,
        createdAt:""
      }
      setResource(mockResource)
    }

    fetchResource()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const isCheckbox = target.type === "checkbox";
    const finalValue = isCheckbox ? (target as HTMLInputElement).checked : value;
  
    setResource((prev) =>
      prev
        ? {
            ...prev,
            [name]: finalValue,
          }
        : prev
    );
  };
  
  const handleAddTag = () => {
    if (
      tagInput.trim() &&
      resource &&
      Array.isArray(resource.tags) &&
      !resource.tags.includes(tagInput.trim())
    ) {
      setResource((prev) =>
        prev
          ? {
              ...prev,
              tags: [...prev?.tags as string[], tagInput.trim()],
            }
          : prev
      );
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    if (!resource) return
    setResource((prev) =>
      prev
        ? {
            ...prev,
            tags: prev?.tags?.filter((t) => t !== tag),
          }
        : prev
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resource) return
    setIsSubmitting(true)
    try {
      // Simulate API call
      console.log("Updating resource:", resource)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/resources")
    } catch (error) {
      console.error("Error updating resource:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resource?")) return
    try {
      console.log("Deleting resource:", id)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/resources")
    } catch (error) {
      console.error("Error deleting resource:", error)
    }
  }

  if (!resource) return <div className="container mx-auto px-4 py-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-royal-DEFAULT">Edit Resource</h1>
        <div className="flex space-x-3">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 flex items-center">
            <FaTrash className="mr-1" /> Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        {/* Example fields */}
        <input
          type="text"
          name="title"
          value={resource.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={resource.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.tags?.map((tag) => (
            <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tag"
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={handleAddTag} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Tag
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <FaTrash className="mr-2" />
            Delete Resource
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 rounded-md text-white bg-royal-DEFAULT hover:bg-royal-dark disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}
