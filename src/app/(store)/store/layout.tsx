import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/(home)/globals.css';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CONCES - Christian E-Commerce Store',
  description: 'Christian apparel, books, and devotionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        {/* <PromoBanner /> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}