import About from "@/components/home/About";
import CTA from "@/components/ui/CTA";
import Donate from "@/components/home/Donate";
import Event from "@/components/home/Event";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Shop from "@/components/home/Shop";
import Sponsor from "@/components/home/Sponsor";
import Head from "next/head";
import React from "react";
import Testimonial from "@/components/home/Testimonials";
import Anthem from "@/components/Anthem";
import { ToastContainer } from "react-toastify";
import StatementOfFaith from "@/components/home/Faith";
import FAQPage from "@/components/home/Faq";
import TalentHubSection from "@/components/home/Hub";

function page() {
  return (
    <div className="font-montserrat bg-gray-5 text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <Hero />
      <About />
      <TalentHubSection />
      <StatementOfFaith />
      <Features />
      <Anthem />

      <Shop />
      <Donate />

      <Sponsor />

      <Testimonial />

      <Event />
      <FAQPage />

      <CTA />
    </div>
  );
}

export default page;
