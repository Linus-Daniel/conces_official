'use client';

import { useSession } from 'next-auth/react';
import { FaPlus } from 'react-icons/fa';

export default function CreatePostButton({ onCreatePost }: { onCreatePost: () => void }) {
  const { data: session, status } = useSession();

  const allowedRoles = ['admin', 'branch-admin', 'alumni'];
  const userRole = session?.user?.role;

  if (status === 'loading') return null;

  const isAuthorized = session && allowedRoles.includes(userRole as string);

  return isAuthorized ? (
    <button
      onClick={onCreatePost}
      className="w-full bg-royal-DEFAULT text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-royal-dark transition-colors"
    >
      <FaPlus />
      <span>Create Post</span>
    </button>
  ) : null;
}
