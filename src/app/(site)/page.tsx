import AboutSection from "@/components/About/AboutSection";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import FeaturesList from "@/components/Home/FeaturesList";
import Hero from "@/components/Home/Hero";
import Newsletter from "@/components/Newsletter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chad Luman | Full Stack Developer",
  description:
    "Portfolio of Chad Luman — USMC veteran and full stack web developer specializing in React, Tailwind, and modern cloud workflows.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Features />
      <FeaturesList />
      <CallToAction />
      <Newsletter />
    </>
  );
}
