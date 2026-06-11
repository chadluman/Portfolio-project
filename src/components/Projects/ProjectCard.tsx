import { Project } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const reverse = index % 2 === 1;

  return (
    <article
      className='group grid items-center gap-9 border-t border-white/15 py-12 lg:grid-cols-12 lg:gap-14 lg:py-20'
      data-anime-card
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`relative block aspect-[16/10] overflow-hidden border border-white/15 bg-[#1b1b18] ${
          reverse ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'
        }`}
        aria-label={`View ${project.title} case study`}
      >
        <Image
          src={project.previewImage}
          alt={project.previewAlt}
          fill
          sizes='(min-width: 1024px) 58vw, 100vw'
          className='object-cover object-top transition duration-500 group-hover:scale-[1.02]'
        />
        <div className='absolute inset-0 bg-[#d8ff3e]/0 transition duration-300 group-hover:bg-[#d8ff3e]/5' />
        <div className='absolute top-4 left-4 bg-[#11110f] px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-[#d8ff3e] uppercase'>
          Case study / {String(index + 1).padStart(2, '0')}
        </div>
      </Link>

      <div
        className={`${reverse ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}`}
      >
        <p className='font-mono text-[10px] tracking-[0.18em] text-[#77756e] uppercase'>
          {project.stack.join(' / ')}
        </p>
        <h3 className='mt-5 font-serif text-4xl leading-none tracking-[-0.04em] text-[#f1efe7] sm:text-5xl'>
          {project.title}
        </h3>
        <p className='mt-6 leading-7 text-[#aaa89f]'>{project.description}</p>

        <div className='mt-7 border-l border-[#d8ff3e] pl-4'>
          <p className='font-mono text-[10px] tracking-[0.15em] text-[#77756e] uppercase'>
            Build note
          </p>
          <p className='mt-2 text-sm leading-6 text-[#d7d4ca]'>
            {project.highlights[0]}
          </p>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className='mt-8 inline-flex items-center gap-3 border-b border-[#d8ff3e] pb-2 font-mono text-xs font-bold tracking-[0.14em] text-[#f1efe7] uppercase transition hover:text-[#d8ff3e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff3e]'
        >
          Inspect the project <span aria-hidden='true'>↗</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
