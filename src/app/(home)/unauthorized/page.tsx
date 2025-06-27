"use client"
// app/unauthorized/page.tsx
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-royal-50 to-royal-100 p-4 text-royal-900">
      <div className="max-w-md w-full bg-white rounded-xl border border-royal-200 p-8 shadow-lg text-center">
        {/* Crown Icon */}
        <div className="mx-auto mb-6 w-20 h-20 relative flex items-center justify-center">
          <div className="absolute w-16 h-8 bg-gradient-to-r from-gold-400 to-gold-600 clip-crown transform rotate-0" />
          <div className="absolute top-6 w-4 h-4 bg-gold-500 rounded-full" />
          <div className="absolute top-6 left-6 w-4 h-4 bg-gold-500 rounded-full" />
          <div className="absolute top-6 right-6 w-4 h-4 bg-gold-500 rounded-full" />
        </div>

        <h1 className="text-3xl font-bold text-royal-800 mb-3 font-serif">
          Access Restricted
        </h1>
        <p className="text-royal-600 mb-6">
          You don't have permission to view this page. Please contact support if you believe this is an error.
        </p>

        <div className="mb-8 flex items-center justify-center text-royal-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-gold-600"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className="font-medium">403 - Forbidden</span>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Return to Home
          </Link>
          <button className="text-royal-600 hover:text-royal-800 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Request Access
          </button>
        </div>
      </div>

      <style jsx global>{`
        .clip-crown {
          clip-path: polygon(
            0% 100%,
            20% 0%,
            50% 60%,
            80% 0%,
            100% 100%
          );
        }
      `}</style>
    </div>
  )
}