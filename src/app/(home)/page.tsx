import About from "@/components/home/About";
import CTA from "@/components/ui/CTA";
import Donate from "@/components/home/Donate";
import Event from "@/components/home/Event";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Leaders from "@/components/home/Leaders";
import Shop from "@/components/home/Shop";
import Sponsor from "@/components/home/Sponsor";
import Head from "next/head";
import React from "react";

function page() {
  return (
    <div className="font-montserrat bg-gray-200 text-gray-800">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <Hero />
      <About />
      <Features />

      <Shop />
      <Donate />

      <Sponsor />

      <Leaders />

      <Event />

      <CTA />
    </div>
  );
}

export default page;
