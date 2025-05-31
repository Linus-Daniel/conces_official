// pages/about.js
export default function AboutPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-conces-blue mb-6">About CONCES</h1>
        
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-conces-blue mb-4">Our Mission</h2>
          <p className="mb-4 ">
            The Conference of Nigerian Christian Engineering Students and Alumni (CONCES) is dedicated to 
            fostering excellence in engineering education and practice while integrating Christian values.
          </p>
          <p>
            We aim to challenge and engage engineering students, prepare them for life after school, 
            integrate faith with engineering practice, and maintain strong alumni involvement.
          </p>
        </div>
        
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-conces-blue mb-4">Our Pillars</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-conces-blue pl-4">
              <h3 className="text-xl font-semibold mb-2">Challenging Students</h3>
              <p>Hackathons, innovation challenges, workshops, and research opportunities.</p>
            </div>
            <div className="border-l-4 border-conces-gold pl-4">
              <h3 className="text-xl font-semibold mb-2">Life Preparation</h3>
              <p>Career workshops, leadership training, internship programs, and alumni talks.</p>
            </div>
            <div className="border-l-4 border-conces-blue pl-4">
              <h3 className="text-xl font-semibold mb-2">Faith Integration</h3>
              <p>Devotionals, faith-based workshops, prayer support, and faith-engineering blog.</p>
            </div>
            <div className="border-l-4 border-conces-gold pl-4">
              <h3 className="text-xl font-semibold mb-2">Alumni Network</h3>
              <p>Mentorship programs, guest lectures, alumni events, and professional networking.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-conces-blue mb-4">Our Team</h2>
          <p>
            CONCES is led by a team of dedicated professionals and volunteers who are passionate about 
            engineering education and Christian values. Our team includes chapter leaders across various 
            institutions, alumni mentors, and an executive board.
          </p>
        </div>
      </div>
    );
  }