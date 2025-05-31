import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
        <Header />

        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
