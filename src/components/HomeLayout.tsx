"use client";
import { SocketProvider } from "@/context/SocketContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import Header from "./home/Header";
import Footer from "./home/Footer";
import { User } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function HomeLayout({ children,user }: { children: ReactNode;user:User | null}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>

    <SessionProvider>

      <SocketProvider>
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </SocketProvider>
    </SessionProvider>
    </QueryClientProvider>
  );
}

export default HomeLayout;
