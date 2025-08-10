
// Sample usage in a component or page
// pages/executives/page.js or app/executives/page.js
/*
'use client';
import { useState, useEffect } from 'react';

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await fetch('/api/executives');
      const data = await response.json();
      if (data.success) {
        setExecutives(data.data);
      }
    } catch (error) {
      console.error('Error fetching executives:', error);
    } finally {
      setLoading(false);
    }
  };

  const markSessionAsExcos = async (session) => {
    try {
      const response = await fetch('/api/executives/batch-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_session_status',
          session: session,
          newStatus: 'Excos'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchExecutives(); // Refresh the list
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CONCES Executives</h1>
      
      <button 
        onClick={() => markSessionAsExcos('2023/2024 Spiritual Session')}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mark 2023/2024 Session as Excos
      </button>

      <div className="grid gap-4">
        {executives.map((executive) => (
          <div key={executive._id} className="border p-4 rounded">
            <h3 className="font-bold">{executive.name}</h3>
            <p>Position: {executive.position}</p>
            <p>Institution: {executive.institution}</p>
            <p>Course: {executive.course}</p>
            <p>Level: {executive.level}</p>
            <p>Session: {executive.session}</p>
            <p>Status: <span className={executive.status === 'Active' ? 'text-green-600' : 'text-blue-600'}>{executive.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

// .env.local example
/*
MONGODB_URI=mongodb://localhost:27017/conces_db
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/conces_db?retryWrites=true&w=majority
*/
