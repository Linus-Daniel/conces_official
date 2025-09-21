// app/admin/events/page.tsx
import Link from 'next/link';
import EventTable from '@/components/admin/EventTable';
import api from '@/lib/axiosInstance';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const chapter = session?.user.chapter;

  const cookieStore = await cookies()

  const response = await api.get(`/chapters/${chapter}/events`,

    {
      headers:{
        cookie: cookieStore.toString()
      }
    }



  );
  const events = response.data;

  console.log('Fetched events:', events);

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-royal-800">All Events</h2>
          <Link 
            href="/chapter/events/new" 
            className="bg-royal-600 hover:bg-royal-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Create New Event
          </Link>
        </div>
        
        <EventTable userRole={user?.role as string} events={events} />
      </div>
  );
}