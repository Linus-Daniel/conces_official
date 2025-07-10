// app/layout.tsx
import type { Metadata } from 'next';
import '@/app/(home)/globals.css';
import StoreLayoutWrapper from '@/components/store/Wrapper';


export const metadata: Metadata = {
  title: 'CONCES - Christian E-Commerce Store',
  description: 'Christian apparel, books, and devotionals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="antialiased">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}
