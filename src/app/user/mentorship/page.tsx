"use client"
import React, { useState } from 'react';
import Modal from '@/components/Modal'; // Assuming you have the custom modal from previous example
import { sendMentorshipRequestEmail } from '@/lib/Mentorship'; // We'll implement this next

type Alumni = {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  email: string;
  available: boolean;
  imageUrl?: string;
};

const AlumniMentorshipPage: React.FC = () => {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);

  // Sample data - in a real app, this would come from an API
  const alumniData: Alumni[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      title: 'Senior Product Manager',
      company: 'Tech Innovations Inc.',
      expertise: ['Product Management', 'Leadership', 'Career Growth'],
      bio: '10+ years of experience in product management across various industries. Passionate about helping early-career professionals navigate their PM journey.',
      email: 'vandulinus@gmail.com',
      available: true,
      imageUrl: '/images/alumni1.jpg'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      title: 'UX Design Director',
      company: 'Creative Solutions',
      expertise: ['UX Design', 'User Research', 'Design Systems'],
      bio: 'Design leader with 8 years of experience building user-centered products. Mentor to several junior designers now in senior roles.',
      email: 'serverside2000@gmail.com',
      available: true,
      imageUrl: '/images/alumni2.jpg'
    },
    // Add more alumni as needed
  ];

  const handleApplyClick = (alumni: Alumni) => {
    setSelectedAlumni(alumni);
    setIsApplicationModalOpen(true);
    setApplicationSent(false);
  };

  const handleSubmitApplication = async () => {
    if (!selectedAlumni || !applicationMessage) return;

    setIsLoading(true);
    
    try {
      // In a real app, you would also save this to your database
      await sendMentorshipRequestEmail({
        alumniEmail: selectedAlumni.email,
        alumniName: selectedAlumni.name,
        applicantMessage: applicationMessage,
      });
      
      setApplicationSent(true);
      setApplicationMessage('');
    } catch (error) {
      console.error('Failed to send mentorship request:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div 
          className="text-center mb-12 p-8 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
            color: '#ffd700',
          }}
        >
          <h1 className="text-4xl font-bold mb-4">Alumni Mentorship Program</h1>
          <p className="text-xl opacity-90">
            Connect with experienced Conces Store alumni for career guidance and professional growth
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumniData.filter(alumni => alumni.available).map((alumni) => (
            <div 
              key={alumni.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {alumni.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={alumni.imageUrl} 
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{alumni.name}</h3>
                    <p className="text-gray-600">{alumni.title} at {alumni.company}</p>
                  </div>
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: alumni.available ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                      color: alumni.available ? '#00C853' : '#ff0000',
                    }}
                  >
                    {alumni.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-500">Expertise</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {alumni.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          backgroundColor: 'rgba(26, 35, 126, 0.1)',
                          color: '#1a237e',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-gray-700 line-clamp-3">{alumni.bio}</p>

                <button
                  onClick={() => handleApplyClick(alumni)}
                  disabled={!alumni.available}
                  className={`mt-6 w-full py-2 px-4 rounded-md font-medium transition-colors ${alumni.available ? 
                    'bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-gold-500' : 
                    'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  style={{ color: alumni.available ? '#ffd700' : undefined }}
                >
                  {alumni.available ? 'Request Mentorship' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        <Modal
          isOpen={isApplicationModalOpen}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setApplicationSent(false);
          }}
          title={`Request Mentorship from ${selectedAlumni?.name}`}
          showCloseButton={!isLoading}
        >
          {applicationSent ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Request Sent!</h3>
              <div className="mt-2 text-gray-600">
                <p>Your mentorship request has been sent to {selectedAlumni?.name}.</p>
                <p className="mt-2">They will contact you if they're available for mentorship.</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="px-4 py-2 rounded font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                    color: '#ffd700',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <p className="text-gray-700">
                  You're requesting mentorship from <strong>{selectedAlumni?.name}</strong>, {selectedAlumni?.title} at {selectedAlumni?.company}.
                </p>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Introduce yourself and explain what you're hoping to gain from this mentorship..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="px-4 py-2 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: '#f0f0f0',
                    color: '#1a237e',
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  className="px-4 py-2 rounded font-medium transition-colors flex items-center"
                  style={{
                    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                    color: '#ffd700',
                  }}
                  disabled={isLoading || !applicationMessage.trim()}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AlumniMentorshipPage;