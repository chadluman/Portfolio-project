import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id='home'
      className='editorial-grid relative overflow-hidden border-b border-white/10 pt-32 sm:pt-36 lg:pt-44'
    >
      <div className='mx-auto grid max-w-[1240px] gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:pb-28 xl:px-0'>
        <div data-anime-reveal>
          <div
            className='mb-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-[#d8ff3e] uppercase'
            data-anime-child
          >
            <span className='h-px w-10 bg-[#d8ff3e]' />
            Clarksville, Tennessee / Available for work
          </div>

          <h1
            className='max-w-[760px] font-serif text-[clamp(3.6rem,8vw,7.8rem)] leading-[0.84] font-medium tracking-[-0.065em] text-[#f1efe7]'
            data-anime-child
          >
            I build dependable digital systems.
          </h1>

          <div
            className='mt-10 grid max-w-[720px] gap-8 border-t border-white/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end'
            data-anime-child
          >
            <p className='max-w-[570px] text-base leading-7 text-[#aaa89f] sm:text-lg'>
              I&apos;m Chad Luman, a full stack developer and military veteran
              bringing an operator&apos;s mindset to useful, maintainable web
              products.
            </p>
            <span className='font-mono text-xs tracking-[0.18em] text-[#77756e] uppercase'>
              Scroll to inspect
            </span>
          </div>

          <div className='mt-10 flex flex-wrap gap-3' data-anime-child>
            <Link
              href='/projects'
              className='inline-flex min-h-12 items-center bg-[#d8ff3e] px-6 font-mono text-xs font-bold tracking-[0.14em] text-[#11110f] uppercase transition hover:bg-[#efffa3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff3e]'
              data-anime-button
            >
              View selected work
            </Link>
            <a
              href='/Chad_Luman_Resume.pdf'
              target='_blank'
              rel='noreferrer'
              className='inline-flex min-h-12 items-center border border-white/25 px-6 font-mono text-xs font-bold tracking-[0.14em] text-[#f1efe7] uppercase transition hover:border-white/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff3e]'
              data-anime-button
            >
              Open resume
            </a>
          </div>
        </div>

        <div className='relative' data-anime-reveal>
          <div
            className='relative ml-auto aspect-[4/5] w-full max-w-[500px] border border-white/15 bg-[#181815] p-3 sm:p-5'
            data-anime-child
          >
            <div className='relative h-full overflow-hidden bg-[#22221e]'>
              <Image
                src='/images/projects/north-sky-ballooning.png'
                alt='North Sky Ballooning project interface'
                fill
                priority
                sizes='(min-width: 1024px) 40vw, 90vw'
                className='object-cover object-top opacity-90 grayscale-[20%]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#11110f] via-transparent to-transparent' />
              <div className='absolute top-4 right-4 border border-white/25 bg-[#11110f]/85 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-[#d8ff3e] uppercase backdrop-blur'>
                Featured build / 04
              </div>
              <div className='absolute inset-x-5 bottom-5 border-l-2 border-[#d8ff3e] pl-4'>
                <p className='font-mono text-[10px] tracking-[0.18em] text-[#aaa89f] uppercase'>
                  React / Express / Reservation workflow
                </p>
                <p className='mt-2 text-xl font-semibold text-white'>
                  North Sky Ballooning
                </p>
              </div>
            </div>
          </div>

          <div className='absolute -bottom-8 -left-3 hidden border border-white/15 bg-[#11110f] p-5 sm:block lg:-left-12'>
            <p className='font-mono text-[10px] tracking-[0.18em] text-[#77756e] uppercase'>
              Operating principle
            </p>
            <p className='mt-2 max-w-[210px] text-sm leading-6 text-[#d7d4ca]'>
              Clear requirements. Calm execution. No mystery in the handoff.
            </p>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 bg-[#0d0d0c]'>
        <div className='mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-white/10 px-5 sm:px-8 lg:grid-cols-4 xl:px-0'>
          {[
            ['08+', 'Years in technical operations'],
            ['500+', 'Users supported'],
            ['70+', 'Systems maintained'],
            ['$2.6M', 'Potential savings identified'],
          ].map(([value, label]) => (
            <div key={label} className='px-4 py-7 first:pl-0 lg:px-8'>
              <p className='font-serif text-3xl text-[#f1efe7]'>{value}</p>
              <p className='mt-1 font-mono text-[10px] tracking-[0.14em] text-[#77756e] uppercase'>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
