import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="about-divider-gradient absolute bottom-0 left-0 h-[1px] w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          <div className="wow fadeInLeft w-full max-w-[570px]">
            <span className="hero-subtitle-text mb-5 block font-semibold">
            About Me
          </span>

          <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
            Veteran, Intelligence Analyst, and Full Stack Web Developer
          </h2>
          <p className="mb-9 font-medium">
            United States Marine Corps veteran and Army Intelligence Analyst with
            8+ years in telecommunications, IT systems, and full stack web
            development. I specialize in building scalable, responsive
            applications, troubleshooting complex systems, and delivering
            solutions that bridge technical and non-technical teams.
          </p>

          <ul className="mb-9 list-disc space-y-2 pl-5 text-white/80">
            <li>Delivered $2.6M in potential cost savings through system optimization.</li>
            <li>Supported 500+ users across 70+ communications and IT systems.</li>
            <li>Built scalable web apps with React, Tailwind, and MySQL.</li>
            <li>Experienced in GitHub version control and Vercel deployment.</li>
          </ul>

          <a
            href="mailto:Luman.Chad@outlook.com"
            className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
          >
            Contact Me
          </a>
          </div>

          <div className="wow fadeInRight relative hidden aspect-556/401 w-full xl:block">
            <Image src="/images/about/about.svg" alt="about" fill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
