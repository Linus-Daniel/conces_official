import PrayerWall from '@/components/user/PrayerWall';
import api from '@/lib/axiosInstance';
import axios from 'axios';

const getPrayerRequests = async () => {
  try {
    const response = await api.get(`/prayer-request`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return [];
  }
};

export default async function PrayerPage() {
  const initialPrayerRequests = await getPrayerRequests();

  return (
    <div className="container mx-auto px-4 py-8">
      <PrayerWall initialPrayerRequests={initialPrayerRequests} />
    </div>
  );
}