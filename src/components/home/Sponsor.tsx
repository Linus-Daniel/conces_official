import React from 'react'

function Sponsor() {
  return (
    <div>
            <section id="sponsors" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-royal-100 text-royal-700 font-medium rounded-full text-sm mb-4">
              Our Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted <span className="text-royal-700">Sponsors</span>
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
              We're grateful for the organizations and individuals who support
              our mission through funding, resources, and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center h-32">
              <img
                className="max-h-16 max-w-full"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7589ee6de6-8b08d291209da72dbfdc.png"
                alt="logo for a Nigerian engineering firm, professional, minimal"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center h-32">
              <img
                className="max-h-16 max-w-full"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0ed9c25dbe-020acfb8b01b0305ba37.png"
                alt="logo for a Nigerian church organization, simple, elegant"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center h-32">
              <img
                className="max-h-16 max-w-full"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e28b40422e-7ece19c8a9b3ef9f6063.png"
                alt="logo for a Nigerian technical university, academic, professional"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center h-32">
              <img
                className="max-h-16 max-w-full"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d2f5c34aea-30231c3ac81902aed00c.png"
                alt="logo for a Nigerian tech company, modern, minimal"
              />
            </div>
          </div>

          <div className="bg-royal-50 p-8 rounded-xl text-center">
            <h3 className="text-xl font-bold text-royal-800 mb-4">
              Become a Sponsor
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Partner with CONCES to support the development of the next
              generation of Christian engineers in Nigeria. Sponsors receive
              recognition, access to talent, and more.
            </p>
            <span className="inline-block px-6 py-3 bg-royal-600 text-white font-bold rounded-lg hover:bg-royal-700 transition shadow hover:shadow-lg cursor-pointer">
              Learn About Sponsorship
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sponsor
