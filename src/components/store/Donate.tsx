export default function DonationBanner() {
    return (
      <section className="py-12 bg-gradient-to-r from-royal-DEFAULT to-royal-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Support Our Mission
              </h2>
              <p className="text-white text-opacity-90 mb-6">
                Your contributions help us provide scholarships and resources to
                Christian engineering students around the world.
              </p>
              <div className="flex flex-wrap gap-3">
                {[10, 25, 50, 100, 'Other'].map((amount) => (
                  <button
                    key={amount}
                    className="bg-white text-royal-DEFAULT font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <button className="bg-gold-DEFAULT hover:bg-gold-dark text-white font-bold px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }