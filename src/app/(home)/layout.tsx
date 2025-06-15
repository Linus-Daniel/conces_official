import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/home/Footer";
import Header from "@/components/layout/Header";
import {SocketProvider} from "../../context/SocketContext";
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
    <html lang="en" className="">
      <body className="antialiased">
        <SocketProvider>

        <Header />
        <main>{children}</main>
        <Footer />
        </SocketProvider>
      </body>
    </html>
  );
}
