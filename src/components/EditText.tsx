'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

import {
  FaBold, FaItalic, FaUnderline, FaLink, FaUnlink, FaImage,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaListOl, FaListUl,
  FaUndo, FaRedo
} from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Write something...'
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      TextStyle,
      Color,
      Link.configure({ 
        openOnClick: false,
        validate: href => /^https?:\/\//.test(href),
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      TextAlign.configure({ 
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Placeholder.configure({ 
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false); // false prevents emitting onUpdate
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (linkUrl === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run();

    setLinkUrl('');
    setIsLinkModalOpen(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setIsImageModalOpen(false);
    }
  }, [editor, imageUrl]);

  if (!editor) {
    return (
      <div className={`border border-gray-300 rounded-md p-4 ${className}`}>
        Loading editor...
      </div>
    );
  }

  return (
    <div className={`border border-gray-300 rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          title="Underline"
        >
          <FaUnderline />
        </button>

        {/* Heading Select */}
        <select
  value={editor.getAttributes('heading').level || '0'}
  onChange={(e) => {
    const level = parseInt(e.target.value);
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else if ([1, 2, 3].includes(level)) {
      editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
    }
  }}
  className="p-1 border border-gray-300 rounded text-sm"
>
  <option value="0">Paragraph</option>
  <option value="1">Heading 1</option>
  <option value="2">Heading 2</option>
  <option value="3">Heading 3</option>
</select>

        {/* Text Align */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          title="Align left"
        >
          <FaAlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          title="Align center"
        >
          <FaAlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          title="Align right"
        >
          <FaAlignRight />
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet list"
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Ordered list"
        >
          <FaListOl />
        </button>

        {/* Link */}
        <button
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run();
            } else {
              setLinkUrl(editor.getAttributes('link').href || '');
              setIsLinkModalOpen(true);
            }
          }}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Link"
        >
          {editor.isActive('link') ? <FaUnlink /> : <FaLink />}
        </button>

        {/* Image */}
        <button
          onClick={() => setIsImageModalOpen(true)}
          className="p-2 rounded hover:bg-gray-200"
          title="Image"
        >
          <FaImage />
        </button>

        {/* Color Picker */}
        <input
          type="color"
          value={editor.getAttributes('textStyle').color || '#000000'}
          onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
          className="w-8 h-8 cursor-pointer"
          title="Text color"
        />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Undo"
        >
          <FaUndo />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Redo"
        >
          <FaRedo />
        </button>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-white shadow-lg rounded-md p-1 border border-gray-200">
            {editor.isActive('link') ? (
              <>
                <a
                  href={editor.getAttributes('link').href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline px-2"
                >
                  {editor.getAttributes('link').href}
                </a>
                <button 
                  onClick={() => editor.chain().focus().unsetLink().run()} 
                  className="text-red-500 px-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-2 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
                >
                  <FaBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-2 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
                >
                  <FaItalic />
                </button>
                <button
                  onClick={() => {
                    setLinkUrl(editor.getAttributes('link').href || '');
                    setIsLinkModalOpen(true);
                  }}
                  className="px-2 hover:bg-gray-100"
                >
                  <FaLink />
                </button>
              </>
            )}
          </div>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="p-4 min-h-[300px] focus:outline-none" 
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsLinkModalOpen(false)} 
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={setLink} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add Image</h3>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onKeyDown={(e) => e.key === 'Enter' && addImage()}
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsImageModalOpen(false)} 
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={addImage} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;