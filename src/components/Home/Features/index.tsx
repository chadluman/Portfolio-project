const principles = [
  {
    number: '01',
    title: 'Understand the operation',
    copy: 'Start with the real workflow, constraints, and people involved before choosing the interface or stack.',
  },
  {
    number: '02',
    title: 'Make complexity legible',
    copy: 'Turn technical requirements into clear states, useful feedback, and decisions a user can understand.',
  },
  {
    number: '03',
    title: 'Ship for the next person',
    copy: 'Build maintainable systems with sensible structure, documented assumptions, and dependable handoffs.',
  },
];

const Features = () => {
  return (
    <section
      id='features'
      className='border-y border-white/10 bg-[#d8ff3e] text-[#11110f]'
    >
      <div className='mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24 xl:px-0'>
        <div className='grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24'>
          <div data-anime-reveal>
            <p
              className='font-mono text-[11px] tracking-[0.22em] uppercase'
              data-anime-child
            >
              03 / Working method
            </p>
            <h2
              className='mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl'
              data-anime-child
            >
              Operator habits, applied to software.
            </h2>
          </div>

          <div className='border-t border-black/30' data-anime-reveal>
            {principles.map((principle) => (
              <article
                key={principle.number}
                className='grid gap-4 border-b border-black/30 py-7 sm:grid-cols-[60px_0.8fr_1.2fr] sm:gap-7'
                data-anime-child
              >
                <span className='font-mono text-xs'>{principle.number}</span>
                <h3 className='text-lg font-bold'>{principle.title}</h3>
                <p className='leading-7 text-black/70'>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
