// "use client"

// import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
// import Link from '@tiptap/extension-link';
// import Placeholder from '@tiptap/extension-placeholder';
// import TextStyle from '@tiptap/extension-text-style';
// import Color from '@tiptap/extension-color';
// import Underline from '@tiptap/extension-underline';
// import { useState, useEffect, useCallback } from 'react';
// import {
//   FaBold, FaItalic, FaUnderline, FaLink, FaUnlink, FaImage,
//   FaAlignLeft, FaAlignCenter, FaAlignRight, FaListOl, FaListUl,
//   FaUndo, FaRedo
// } from 'react-icons/fa';

// interface RichTextEditorProps {
//   value: string;
//   onChange: (content: string) => void;
//   className?: string;
//   placeholder?: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className = '', placeholder = 'Write something...' }) => {
//   const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
//   const [linkUrl, setLinkUrl] = useState('');
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
//       Image,
//       Underline,
//       TextStyle,
//       Color,
//       Link.configure({ openOnClick: false }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange(editor.getHTML()),
//   });

//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value);
//     }
//   }, [value, editor]);

//   const addLink = useCallback(() => {
//     if (editor && linkUrl) {
//       editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
//       setLinkUrl('');
//       setIsLinkModalOpen(false);
//     }
//   }, [editor, linkUrl]);

//   const addImage = useCallback(() => {
//     if (editor && imageUrl) {
//       editor.chain().focus().setImage({ src: imageUrl }).run();
//       setImageUrl('');
//       setIsImageModalOpen(false);
//     }
//   }, [editor, imageUrl]);

//   if (!editor) return <div className={`border border-gray-300 rounded-md p-4 ${className}`}>Loading editor...</div>;

//   const handleCommand = (command: () => void) => () => {
//     editor.chain().focus();
//     command();
//   };

//   return (
//     <div className={`border border-gray-300 rounded-md ${className}`}>
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
//         {/* Bold/Italic/Underline */}
//         {[{ icon: FaBold, command: () => editor.commands.toggleBold(), label: 'bold' },
//           { icon: FaItalic, command: () => editor.commands.toggleItalic(), label: 'italic' },
//           { icon: FaUnderline, command: () => editor.commands.toggleUnderline(), label: 'underline' }].map(({ icon: Icon, command, label }) => (
//           <button
//             key={label}
//             onClick={handleCommand(command)}
//             className={`p-2 rounded hover:bg-gray-200 ${editor.isActive(label) ? 'bg-gray-200' : ''}`}
//             title={label.charAt(0).toUpperCase() + label.slice(1)}
//           >
//             <Icon />
//           </button>
//         ))}

//         {/* Heading Dropdown */}
//         <select
//           value={editor.getAttributes('heading').level || '0'}
//           onChange={(e) => {
//             const level = parseInt(e.target.value);
//             level === 0 ? editor.chain().focus().setParagraph().run() : editor.chain().focus().toggleHeading({ level }).run();
//           }}
//           className="p-1 border border-gray-300 rounded text-sm"
//         >
//           <option value="0">Paragraph</option>
//           <option value="1">Heading 1</option>
//           <option value="2">Heading 2</option>
//           <option value="3">Heading 3</option>
//         </select>

//         {/* Text Align */}
//         {[{ icon: FaAlignLeft, align: 'left' },
//           { icon: FaAlignCenter, align: 'center' },
//           { icon: FaAlignRight, align: 'right' }].map(({ icon: Icon, align }) => (
//           <button
//             key={align}
//             onClick={() => editor.chain().focus().set(align).run()}
//             className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: align }) ? 'bg-gray-200' : ''}`}
//             title={`Align ${align}`}
//           >
//             <Icon />
//           </button>
//         ))}

//         {/* Lists */}
//         {[{ icon: FaListUl, command: () => editor.commands.toggleBulletList(), label: 'bulletList' },
//           { icon: FaListOl, command: () => editor.commands.toggleOrderedList(), label: 'orderedList' }].map(({ icon: Icon, command, label }) => (
//           <button
//             key={label}
//             onClick={handleCommand(command)}
//             className={`p-2 rounded hover:bg-gray-200 ${editor.isActive(label) ? 'bg-gray-200' : ''}`}
//             title={label.replace(/([A-Z])/g, ' $1')}
//           >
//             <Icon />
//           </button>
//         ))}

//         {/* Link */}
//         <button
//           onClick={() => {
//             if (editor.isActive('link')) {
//               editor.chain().focus().unsetLink().run();
//             } else {
//               setLinkUrl(editor.getAttributes('link').href || '');
//               setIsLinkModalOpen(true);
//             }
//           }}
//           className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
//           title="Link"
//         >
//           {editor.isActive('link') ? <FaUnlink /> : <FaLink />}
//         </button>

//         {/* Image */}
//         <button onClick={() => setIsImageModalOpen(true)} className="p-2 rounded hover:bg-gray-200" title="Image">
//           <FaImage />
//         </button>

//         {/* Color Picker */}
//         <input
//           type="color"
//           value={editor.getAttributes('textStyle').color || '#000000'}
//           onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
//           className="w-8 h-8 cursor-pointer"
//           title="Text color"
//         />

//         {/* Undo/Redo */}
//         {[{ icon: FaUndo, command: () => editor.commands.undo(), label: 'undo' },
//           { icon: FaRedo, command: () => editor.commands.redo(), label: 'redo' }].map(({ icon: Icon, command, label }) => (
//           <button
//             key={label}
//             onClick={handleCommand(command)}
//             disabled={!editor.can()[label as keyof typeof editor.can]()}
//             className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
//             title={label.charAt(0).toUpperCase() + label.slice(1)}
//           >
//             <Icon />
//           </button>
//         ))}
//       </div>

//       {/* Bubble Menu */}
//       {editor && (
//         <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//           <div className="flex bg-white shadow-lg rounded-md p-1 border border-gray-200">
//             {editor.isActive('link') ? (
//               <>
//                 <a
//                   href={editor.getAttributes('link').href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline px-2"
//                 >
//                   {editor.getAttributes('link').href}
//                 </a>
//                 <button onClick={() => editor.chain().focus().unsetLink().run()} className="text-red-500 px-2">
//                   Remove
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => {
//                   setLinkUrl(editor.getAttributes('link').href || '');
//                   setIsLinkModalOpen(true);
//                 }}
//                 className="px-2 hover:bg-gray-100"
//               >
//                 Add link
//               </button>
//             )}
//           </div>
//         </BubbleMenu>
//       )}

//       {/* Editor Content */}
//       <EditorContent editor={editor} className="p-4 min-h-[300px]" />

//       {/* Link Modal */}
//       {isLinkModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Add Link</h3>
//             <input
//               type="url"
//               value={linkUrl}
//               onChange={(e) => setLinkUrl(e.target.value)}
//               placeholder="https://example.com"
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button onClick={() => setIsLinkModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded">
//                 Cancel
//               </button>
//               <button onClick={addLink} className="px-4 py-2 bg-blue-500 text-white rounded">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Add Image</h3>
//             <input
//               type="url"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               placeholder="https://example.com/image.jpg"
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <div className="flex justify-end space-x-2">
//               <button onClick={() => setIsImageModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded">
//                 Cancel
//               </button>
//               <button onClick={addImage} className="px-4 py-2 bg-blue-500 text-white rounded">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RichTextEditor;

import React from 'react'

function EditText() {
  return (
    <div>EditText</div>
  )
}

export default EditText
