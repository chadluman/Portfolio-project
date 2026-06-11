import Link from 'next/link';

const CallToAction = () => {
  return (
    <section id='contact' className='editorial-grid bg-[#11110f]'>
      <div className='mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-36 xl:px-0'>
        <div className='grid gap-12 border-t border-white/20 pt-10 lg:grid-cols-[1fr_auto] lg:items-end'>
          <div data-anime-reveal>
            <p
              className='font-mono text-[11px] tracking-[0.22em] text-[#d8ff3e] uppercase'
              data-anime-child
            >
              04 / Open channel
            </p>
            <h2
              className='mt-6 max-w-[880px] font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.06em] text-[#f1efe7]'
              data-anime-child
            >
              Have a useful problem to solve?
            </h2>
          </div>

          <div className='lg:pb-3' data-anime-reveal>
            <p
              className='max-w-[350px] leading-7 text-[#aaa89f]'
              data-anime-child
            >
              I&apos;m open to full-time roles, contract projects, and
              conversations about web products or technical operations.
            </p>
            <Link
              href='mailto:Luman.Chad@outlook.com'
              className='mt-7 inline-flex min-h-12 items-center bg-[#d8ff3e] px-6 font-mono text-xs font-bold tracking-[0.14em] text-[#11110f] uppercase transition hover:bg-[#efffa3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff3e]'
              data-anime-button
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
