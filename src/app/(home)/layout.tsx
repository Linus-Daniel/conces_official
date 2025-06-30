import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/home/Footer";
import Header from "@/components/layout/Header";
import { SocketProvider } from "../../context/SocketContext";
import { SessionProvider } from "next-auth/react";
import HomeLayout from "@/components/HomeLayout";
export const metadata: Metadata = {
  title: "Conces",
  description: "faithful and committed to the cause of Christ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased">
        <HomeLayout>
          {children}
        </HomeLayout>
      </body>
    </html>
  );
}
