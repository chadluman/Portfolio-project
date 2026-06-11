const timeline = [
  {
    marker: '01',
    title: 'Communications',
    context: 'United States Marine Corps',
    description:
      'Built the foundation: disciplined troubleshooting, field communications, and reliable systems under real operational constraints.',
  },
  {
    marker: '02',
    title: 'Intelligence & IT',
    context: 'Army / Technical Operations',
    description:
      'Supported users, networks, servers, and mission workflows while translating technical detail into decisions leaders could use.',
  },
  {
    marker: '03',
    title: 'Product Development',
    context: 'Full Stack Web',
    description:
      'Now applying that systems experience to responsive applications, data-driven workflows, and maintainable software delivery.',
  },
];

const AboutSection = () => {
  return (
    <section id='about' className='border-b border-white/10 bg-[#151512]'>
      <div className='mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32 xl:px-0'>
        <div className='grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24'>
          <div data-anime-reveal>
            <p
              className='font-mono text-[11px] tracking-[0.22em] text-[#d8ff3e] uppercase'
              data-anime-child
            >
              01 / Field notes
            </p>
            <h2
              className='mt-5 max-w-[420px] font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-[#f1efe7] sm:text-6xl'
              data-anime-child
            >
              From field systems to product systems.
            </h2>
            <p
              className='mt-7 max-w-[460px] leading-7 text-[#aaa89f]'
              data-anime-child
            >
              My path into development was not a straight line through a design
              agency or coding bootcamp. It came through communications,
              intelligence, infrastructure, and years of making complicated
              systems understandable.
            </p>
          </div>

          <div className='border-t border-white/20' data-anime-reveal>
            {timeline.map((item) => (
              <article
                key={item.marker}
                className='grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[70px_0.8fr_1.2fr] sm:gap-8'
                data-anime-child
              >
                <span className='font-mono text-xs text-[#d8ff3e]'>
                  {item.marker}
                </span>
                <div>
                  <h3 className='text-xl font-semibold text-[#f1efe7]'>
                    {item.title}
                  </h3>
                  <p className='mt-2 font-mono text-[10px] tracking-[0.15em] text-[#77756e] uppercase'>
                    {item.context}
                  </p>
                </div>
                <p className='leading-7 text-[#aaa89f]'>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
