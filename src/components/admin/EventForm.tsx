"use client"
// components/EventForm.tsx
import { useState, useRef, useCallback } from 'react';
import { IEvent } from '@/models/Events';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface EventFormProps {
  event?: IEvent;
  onSubmit: (eventData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function EventForm({ event, onSubmit, isSubmitting }: EventFormProps) {
  const [imagePreview, setImagePreview] = useState(event?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [longDescription, setLongDescription] = useState(event?.longDescription || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Write the detailed description of your event...',
      }),
    ],
    content: event?.longDescription || '',
    onUpdate: ({ editor }) => {
      setLongDescription(editor.getHTML());
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB max)
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
    
    // Add the HTML content from Tiptap
    formData.set('longDescription', longDescription);
    
    if (fileInputRef.current?.files?.[0]) {
      formData.append('file', fileInputRef.current.files[0]);
      formData.append('type', 'events'); // Specify the folder type
    } else if (event?.image) {
      formData.append('imageUrl', event.image);
    }

    await onSubmit(formData);
  };

  const addImage = useCallback(() => {
    const url = window.prompt('Enter the URL of the image:');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
      <div className="grid text-gray-900 grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title*
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={event?.title}
            required
            className="mt-1 block w-full border border-gray-300  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category*
          </label>
          <select
            id="category"
            name="category"
            defaultValue={event?.category}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          >
            <option value="spiritual">Spiritual</option>
            <option value="academic">Academic</option>
            <option value="career">Career</option>
            <option value="social">Social</option>
          </select>
        </div>

       

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date*
          </label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={event?.date}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time*
          </label>
          <input
            type="text"
            name="time"
            id="time"
            defaultValue={event?.time}
            placeholder="e.g., 10:00 AM - 4:00 PM"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location*
          </label>
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={event?.location}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

     
        <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Event Image*
        </label>
        <div className="mt-1 flex items-center">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-16 w-16 rounded-md object-cover mr-4"
            />
          )}
          <div className="flex-1">
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-royal-50 file:text-royal-700
                hover:file:bg-royal-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              JPEG, PNG, or GIF (Max 5MB)
            </p>
          </div>
        </div>
      </div>

        <div>
          <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700">
            Registration Link*
          </label>
          <input
            type="url"
            name="registrationLink"
            id="registrationLink"
            defaultValue={event?.registrationLink}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Contact Email*
          </label>
          <input
            type="email"
            name="contactEmail"
            id="contactEmail"
            defaultValue={event?.contactEmail}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
            Contact Phone*
          </label>
          <input
            type="tel"
            name="contactPhone"
            id="contactPhone"
            defaultValue={event?.contactPhone}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        <div className="flex items-center">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={event?.featured}
            className="h-4 w-4 text-royal-600 focus:ring-royal-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Featured Event
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Short Description*
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={event?.description}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500 resize-none"
          style={{ resize: 'none' }} // Ensure the textarea is not resizable
        />
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
          Long Description*
        </label>
        <div className="mt-1">
          {editor && (
            <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
              <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Bold"
                >
                  <span className="font-bold">B</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Italic"
                >
                  <span className="italic">I</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Underline"
                >
                  <span className="underline">U</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Bullet List"
                >
                  <span>• List</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Numbered List"
                >
                  <span>1. List</span>
                </button>
                <button
                  type="button"
                  onClick={addImage}
                  className="p-1 rounded hover:bg-gray-100"
                  title="Add Image"
                >
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl);

                    if (url === null) return;
                    if (url === '') {
                      editor.chain().focus().extendMarkRange('link').unsetLink().run();
                      return;
                    }

                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }}
                  className={`p-1 rounded ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Link"
                >
                  <span>Link</span>
                </button>
              </div>
              <EditorContent
                editor={editor}
                className="min-h-[200px] p-3 focus:outline-none focus:ring-1 focus:ring-royal-500"
              />
            </div>
          )}
          <input type="hidden" name="longDescription" value={longDescription} />
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={2}
          defaultValue={event?.requirements}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-royal-500 focus:border-royal-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-royal-600 hover:bg-royal-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Event'}
        </button>
      </div>
    </form>
  );
}