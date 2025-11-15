'use client';

import { useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { FaQuoteLeft, FaPaperPlane } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api from '@/lib/axiosInstance';

const TestimonyPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [testimonies, setTestimonies] = useState<any[]>([]); // You should type this properly later
  const [content, setContent] = useState('');
  const user = session?.user

  useEffect(()=>{
    const getTestimonies = async ()=>{
            try{
                const response =await api.get("/testimonies")
                setTestimonies(response.data)
            }catch(error){
                console.error("Error fetching testimonies:", error instanceof Error ? error.message : "Unknown error")
            }
    }
    getTestimonies()
  },[])
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await api.post('/testimonies', { content,name:user?.name, role:user?.role });

      setTestimonies([res.data, ...testimonies]);
      setContent('');
    } catch (error) {
      console.error('Failed to submit testimony:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-conces-blue">Member Testimonies</h1>
        <p className="text-gray-600 mt-2">
          Read stories from our members. Logged-in users can also share theirs.
        </p>
      </div>

      {/* Recent testimonies (to be fetched from API later) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {testimonies.map((testimony) => (
          <div key={testimony._id} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-start">
              <FaQuoteLeft className="text-conces-gold text-2xl mr-3" />
              <p className="text-gray-700 italic">{testimony.content}</p>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={testimony.avatar || '/default-avatar.png'}
                className="w-10 h-10 rounded-full mr-3"
                alt="User Avatar"
              />
              <div>
                <p className="text-conces-blue font-semibold">{testimony.name}</p>
                <p className="text-gray-400 text-sm">{new Date(testimony.createdAt).toDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Testimony */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold text-conces-blue mb-2">Share Your Testimony</h2>
          <textarea
            name="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write how CONCES impacted your life..."
            className="w-full rounded-md border-gray-300 focus:ring-conces-blue focus:border-conces-blue"
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sharing...' : (
              <>
                <FaPaperPlane className="mr-2" />
                Share Testimony
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p>You must be logged in to share a testimony.</p>
          <Button className="mt-4" onClick={() => router.push(`/auth?mode=signin`)}>
            Login to Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestimonyPage;
