import React from 'react'

function Anthem() {
  return (
    
<section className="relative py-16 bg-gradient-to-b from-royal-600 to-royal-900 text-white overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold-400 mix-blend-overlay"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gold-300 mix-blend-overlay"></div>
    <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gold-500 mix-blend-overlay"></div>
  </div>

  <div className="max-w-5xl mx-auto px-6 relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-gold-400">CONCES</span> Anthem
      </h2>
      <div className="w-24 h-1 bg-gold-500 mx-auto mb-4"></div>
      <p className="text-royal-200 max-w-2xl mx-auto">
        Our unifying song of purpose and vision
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Anthem Lyrics */}
        <div className="space-y-6 text-lg">
          <p className="font-semibold text-gold-300">
            We are the students of engineering
          </p>
          <p>Filled with the spirit of God</p>
          <p>
            With skills, ability and knowledge<br />
            In all kinds of craft
          </p>
          <p className="font-semibold text-gold-300">
            CONCES must move on together in one accord
          </p>
          <p>
            CONCES must move on<br />
            In harmony, peace and love
          </p>
          <div className="pl-4 border-l-4 border-gold-400">
            <p className="italic text-gold-200">
              Your talent, my talent<br />
              Let's put them together
            </p>
            <p className="italic text-gold-200 mt-2">
              To sustain the legacy<br />
              Of the creator and of creation in one love
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-royal-800/50 p-6 rounded-xl border border-gold-500/20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gold-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center text-gold-300 mb-4">
            Listen to the Anthem
          </h3>
          <div className="space-y-4">
            <div className="h-2 bg-royal-700 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 w-1/3"></div>
            </div>
            <div className="flex justify-between text-sm text-royal-300">
              <span>1:24</span>
              <span>3:48</span>
            </div>
            <div className="flex justify-center space-x-6">
              <button className="text-gold-400 hover:text-gold-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="bg-gold-500 hover:bg-gold-400 text-royal-900 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button className="text-gold-400 hover:text-gold-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Download Button */}
    <div className="text-center mt-10">
      <button className="inline-flex items-center px-6 py-3 border-2 border-gold-500 text-gold-400 font-medium rounded-lg hover:bg-gold-500 hover:text-royal-900 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Download Anthem Lyrics
      </button>
    </div>
  </div>
</section>


)
}

export default Anthem