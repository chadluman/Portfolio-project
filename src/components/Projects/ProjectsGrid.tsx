import { projects } from '@/data/projects';
import Link from 'next/link';
import ProjectCard from './ProjectCard';

const ProjectsGrid = () => {
  return (
    <section id='projects' className='bg-[#11110f]'>
      <div className='mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32 xl:px-0'>
        <div
          className='grid gap-8 pb-12 lg:grid-cols-[1fr_auto] lg:items-end'
          data-anime-reveal
        >
          <div data-anime-child>
            <p className='font-mono text-[11px] tracking-[0.22em] text-[#d8ff3e] uppercase'>
              02 / Selected work
            </p>
            <h2 className='mt-5 max-w-[760px] font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[#f1efe7] sm:text-7xl'>
              Built for use, not just display.
            </h2>
          </div>
          <div className='max-w-[380px] lg:text-right' data-anime-child>
            <p className='leading-7 text-[#aaa89f]'>
              A mix of workflow tools, API-driven interfaces, and full-stack
              product experiments.
            </p>
            <Link
              href='/projects'
              className='mt-5 inline-block font-mono text-xs tracking-[0.14em] text-[#d8ff3e] uppercase'
            >
              View complete project index
            </Link>
          </div>
        </div>

        <div data-anime-reveal>
          {projects.map((project, index) => (
            <div key={project.slug} data-anime-child>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
