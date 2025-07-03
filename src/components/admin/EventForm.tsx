'use client';

import { useState, useRef } from 'react';
import { IEvent } from '@/models/Events';
import RichTextEditor from '../EditText';

interface EventFormProps {
  event?: IEvent;
  onSubmit: (eventData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function EventForm({ event, onSubmit, isSubmitting }: EventFormProps) {
  const [imagePreview, setImagePreview] = useState(event?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [longDescription, setLongDescription] = useState(event?.longDescription || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('longDescription', longDescription);

    if (fileInputRef.current?.files?.[0]) {
      formData.append('file', fileInputRef.current.files[0]);
      formData.append('type', 'events');
    } else if (event?.image) {
      formData.append('imageUrl', event.image);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={event?.title}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category*</label>
          <select
            id="category"
            name="category"
            defaultValue={event?.category}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          >
            <option value="spiritual">Spiritual</option>
            <option value="academic">Academic</option>
            <option value="career">Career</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium">Date*</label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={event?.date}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium">Time*</label>
          <input
            type="text"
            name="time"
            id="time"
            defaultValue={event?.time}
            required
            placeholder="e.g., 10:00 AM - 4:00 PM"
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">Location*</label>
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={event?.location}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium">Event Image*</label>
          <div className="mt-1 flex items-center gap-4">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-md object-cover" />
            )}
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-royal-50 file:text-royal-700 hover:file:bg-royal-100"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or GIF (Max 5MB)</p>
        </div>

        <div>
          <label htmlFor="registrationLink" className="block text-sm font-medium">Registration Link*</label>
          <input
            type="url"
            name="registrationLink"
            id="registrationLink"
            defaultValue={event?.registrationLink}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium">Contact Email*</label>
          <input
            type="email"
            name="contactEmail"
            id="contactEmail"
            defaultValue={event?.contactEmail}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium">Contact Phone*</label>
          <input
            type="tel"
            name="contactPhone"
            id="contactPhone"
            defaultValue={event?.contactPhone}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div className="flex items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={event?.featured}
            className="h-4 w-4 text-royal-600 border-gray-300 rounded focus:ring-royal-500"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">Featured Event</label>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">Short Description*</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={event?.description}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500 resize-none"
        />
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium">Long Description*</label>
        <div className="mt-1">
          <RichTextEditor value={longDescription} onChange={setLongDescription} placeholder="Write the detailed description of your event..." />
          <input type="hidden" name="longDescription" value={longDescription} />
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium">Requirements</label>
        <textarea
          id="requirements"
          name="requirements"
          rows={2}
          defaultValue={event?.requirements}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-royal-500 focus:border-royal-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-royal-600 hover:bg-royal-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Event'}
        </button>
      </div>
    </form>
  );
}
