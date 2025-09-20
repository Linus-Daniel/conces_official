'use client';

import React, { useState } from 'react';
import { FaQuoteLeft, FaHeart } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import api from '@/lib/axiosInstance';

function Donate() {
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number | null>(null);
  const [donating, setDonating] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    anonymous: false
  });

  const predefinedAmounts = [500, 1000, 2000, 5000, 10000];

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      return toast.error('Please select a valid amount');
    }

    // Skip validation if user is authenticated
    if (!session?.user) {
      if (!donorInfo.anonymous && !donorInfo.name.trim()) {
        return toast.error('Please enter your name');
      }
      if (!donorInfo.email.trim()) {
        return toast.error('Please enter your email');
      }
      if (!/^\S+@\S+\.\S+$/.test(donorInfo.email)) {
        return toast.error('Please enter a valid email');
      }
    }

    try {
      setDonating(true);
      const response = await api.post('/donation', {
        email: session?.user?.email || donorInfo.email,
        amount,
        donorName: donorInfo.anonymous ? 'Anonymous' : (session?.user?.name || donorInfo.name),
        purpose: 'Website Donation',
        anonymous: donorInfo.anonymous
      });

      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      console.error('Donation failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setDonating(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-royal-900 via-royal-800 to-royal-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Support Our Mission</h3>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Select Amount (₦)</h4>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-3 rounded-lg transition-all ${
                        amount === amt
                          ? 'bg-gold-500 text-royal-900 font-bold scale-95'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {amt.toLocaleString()}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      const custom = prompt('Enter amount in Naira:');
                      const num = Number(custom?.replace(/\D/g, ''));
                      if (!isNaN(num)) setAmount(num > 0 ? num : null);
                    }}
                    className="py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition col-span-3"
                  >
                    {amount && !predefinedAmounts.includes(amount) 
                      ? `₦${amount.toLocaleString()}` 
                      : 'Custom Amount'}
                  </button>
                </div>
              </div>

        
                <div className="space-y-4 mb-6">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={donorInfo.anonymous}
                      onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                    />
                    <label htmlFor="anonymous" className="text-white text-sm">
                      Donate anonymously
                    </label>
                  </div>

                  {!donorInfo.anonymous && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email (for receipt)"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              
            

              <button
                onClick={handleDonate}
                disabled={donating || !amount}
                className="w-full py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {donating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-royal-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaHeart className="text-royal-900" />
                    Donate Now
                  </>
                )}
              </button>
            </div>

          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
            <img
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/18d6a41269-8688190f13a2398e8d2b.png"
              alt="Nigerian engineering students working on a community project"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent flex items-end">
              <div className="p-6">
                <span className="text-white font-semibold">
                  Your donations fund community impact projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Donate;