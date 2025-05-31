import About from "@/components/About";
import CTA from "@/components/CTA";
import Donate from "@/components/Donate";
import Event from "@/components/Event";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Leaders from "@/components/Leaders";
import Shop from "@/components/Shop";
import Sponsor from "@/components/Sponsor";
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
