// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import HomeLayout from "@/components/HomeLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import type { ReactNode } from "react";
import type { User } from "next-auth";

export const metadata: Metadata = {
  title: "Conces",
  description: "faithful and committed to the cause of Christ",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  const user: User | null = session?.user ?? null;

  return (
    <html lang="en">
      <body className="antialiased">
        <HomeLayout user={user}>
          {children}
        </HomeLayout>
      </body>
    </html>
  );
}
