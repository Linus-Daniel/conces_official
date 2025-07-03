// pages/about.js
export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-conces-blue mb-6">About CONCES</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting Christian engineering students across Nigeria since 1997
        </p>
      </div>

      {/* History Section */}
      <section className="mb-16 bg-gradient-to-r from-conces-blue to-royal-DEFAULT text-white p-8 rounded-2xl shadow-xl">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our History</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                CONCES (Conference of Nigerian Christian Engineering Students) is a non-governmental organization comprising Christian Higher Learning Institutions (Universities and Polytechnics). It is registered with the Corporate Affairs Commission (CAC) under the name AONCEES (Association of Nigerian Christian Engineers and Engineering Students) since September 6, 2012.
              </p>
              <p className="mb-4">
                The vision began at ABU Zaria in 1995 and was established by UNIBEN in 1997. CONCES is inter-denominational in nature - membership is open to students from various denominations without alignment to any specific church or group.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Key Milestones</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block bg-conces-gold text-conces-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>1995: Vision conceived at ABU Zaria</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-conces-gold text-conces-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>1997: Officially established by UNIBEN</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-conces-gold text-conces-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>2012: Registered with CAC as AONCEES</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Vision Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-gold-500">
          <div className="flex items-center mb-6">
            <div className="bg-conces-blue/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-conces-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-conces-blue">Our Vision</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Promote unity and oneness in Christ (Hebrews 12:2)</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Sharpen members spiritually, academically and technologically</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Correct ineffectiveness in engineering students and young graduates</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Yield our engineering skills to the Lord for His Glory</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Move our nation forward through creative inspirations</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-gold mr-2">•</span>
              <span>Evangelize through engineering and engineer through missions</span>
            </li>
          </ul>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-conces-blue">
          <div className="flex items-center mb-6">
            <div className="bg-conces-blue/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-conces-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-conces-blue">Our Mission</h2>
          </div>
          <p className="mb-4">
            CONCES is a socio-religious-academic body that operates in an atmosphere of spiritual communion and worship to:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-conces-blue mr-2">•</span>
              <span>Enhance academic performance of members</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-blue mr-2">•</span>
              <span>Inspire professional excellence</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-blue mr-2">•</span>
              <span>Evangelize the Faculty of Engineering</span>
            </li>
            <li className="flex items-start">
              <span className="text-conces-blue mr-2">•</span>
              <span>Provide spiritual exploration, expansion and growth</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Pillars Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-conces-blue mb-4">Our Pillars</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four foundational principles that guide our activities and programs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-conces-blue">
            <div className="bg-conces-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-conces-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Challenging Students</h3>
            <p className="text-gray-600">Hackathons, innovation challenges, workshops, and research opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-gold-500">
            <div className="bg-conces-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Life Preparation</h3>
            <p className="text-gray-600">Career workshops, leadership training, internship programs, and alumni talks.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-conces-blue">
            <div className="bg-conces-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-conces-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Faith Integration</h3>
            <p className="text-gray-600">Devotionals, faith-based workshops, prayer support, and faith-engineering blog.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-gold-500">
            <div className="bg-conces-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Alumni Network</h3>
            <p className="text-gray-600">Mentorship programs, guest lectures, alumni events, and professional networking.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-conces-blue mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 mb-8">
              CONCES is led by a team of dedicated professionals and volunteers who are passionate about engineering education and Christian values. Our team includes chapter leaders across various institutions, alumni mentors, and an executive board.
            </p>
            <button className="bg-conces-blue hover:bg-conces-dark-blue text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Meet the Team
            </button>
          </div>
        </div>
        <div className="bg-gray-50 p-6 text-center">
          <p className="text-gray-500">
            Interested in joining our team? <a href="#" className="text-conces-blue font-medium hover:underline">Contact us</a> to learn about volunteer opportunities.
          </p>
        </div>
      </section>
    </div>
  );
}