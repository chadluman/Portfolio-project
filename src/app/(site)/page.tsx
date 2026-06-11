import AboutSection from '@/components/About/AboutSection';
import CallToAction from '@/components/CallToAction';
import Features from '@/components/Home/Features';
import Hero from '@/components/Home/Hero';
import ProjectsGrid from '@/components/Projects/ProjectsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chad Luman | Full Stack Developer',
  description:
    'Portfolio of Chad Luman — USMC veteran and full stack web developer specializing in React, Tailwind, and modern cloud workflows.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsGrid />
      <Features />
      <CallToAction />
    </>
  );
}
