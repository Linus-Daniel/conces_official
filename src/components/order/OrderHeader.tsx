export default function Header() {
    return (
      <header className="bg-royal-DEFAULT text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="text-gold-300">Royal</span>
              <span className="text-white">Store</span>
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-gold-300 transition">Shop</a>
              <a href="#" className="hover:text-gold-300 transition">Collections</a>
              <a href="#" className="hover:text-gold-300 transition">About</a>
              <a href="#" className="hover:text-gold-300 transition">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-royal-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="sr-only">Cart</span>
              </button>
              <button className="p-2 rounded-full hover:bg-royal-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="sr-only">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }