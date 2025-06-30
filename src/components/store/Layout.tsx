'use client';

import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import useCart from '@/zustand/useCart';

function StoreLayout({ children }: { children: ReactNode }) {
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <SessionProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}

export default StoreLayout;
