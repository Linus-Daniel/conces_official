"use client";
import { SocketProvider } from "@/context/SocketContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import Header from "./layout/Header";
import Footer from "./home/Footer";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SocketProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SocketProvider>
    </SessionProvider>
  );
}

export default HomeLayout;
