// app/admin/events/page.tsx
import Link from 'next/link';
import EventTable from '@/components/admin/EventTable';
import api from '@/lib/axiosInstance';

export default async function AdminEventsPage() {

  const response = await api.get('/events');
  const events = response.data;

  console.log('Fetched events:', events);

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-royal-800">All Events</h2>
          <Link 
            href="/admin/events/new" 
            className="bg-royal-600 hover:bg-royal-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Create New Event
          </Link>
        </div>
        
        <EventTable events={events} />
      </div>
  );
}