import AboutSection from "@/components/About/AboutSection";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import Newsletter from "@/components/Newsletter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Chad Luman",
  description:
    "About Chad Luman — USMC veteran and full stack web developer specializing in modern web apps and systems operations.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="About" />
      <AboutSection />
      <Features />
      <CallToAction />
      <Newsletter />
    </>
  );
};

export default AboutPage;
