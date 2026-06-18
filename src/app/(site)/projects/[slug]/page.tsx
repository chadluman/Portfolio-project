import Breadcrumb from '@/components/Breadcrumb';
import ProjectPreview from '@/components/Projects/ProjectPreview';
import { getProject, projects } from '@/data/projects';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = () =>
  projects.map((project) => ({
    slug: project.slug,
  }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Chad Luman',
    };
  }

  return {
    title: `${project.title} | Chad Luman`,
    description: project.summary,
  };
};

const ProjectDetailsPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Breadcrumb pageTitle={project.title} />
      <section className='overflow-hidden pt-10 pb-17.5 lg:pb-22.5 xl:pb-27.5'>
        <div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
          <div
            className='grid gap-10 lg:grid-cols-2 lg:items-start'
            data-anime-reveal
          >
            <ProjectPreview project={project} />

            <div data-anime-child>
              <span className='hero-subtitle-gradient relative mb-5 inline-flex items-center rounded-full px-4.5 py-2 text-sm font-medium'>
                <span className='hero-subtitle-text'>{project.folder}</span>
              </span>
              <h2 className='text-heading-3 mb-5 font-bold text-white'>
                {project.title}
              </h2>
              <p className='mb-8 text-lg font-medium'>{project.description}</p>

              <div className='mb-8 flex flex-wrap gap-3'>
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white'
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className='mb-8 border-l-2 border-[#d8ff3e] pl-4'>
                <p className='font-mono text-[10px] tracking-[0.16em] text-[#d8ff3e] uppercase'>
                  Demo source / {project.sourceRevision}
                </p>
                <p className='mt-2 text-sm leading-6 text-white/70'>
                  {project.demoNote}
                </p>
              </div>

              <div className='flex flex-wrap gap-4'>
                <Link
                  href='/projects'
                  className='features-button-gradient hover:shadow-button relative inline-flex items-center rounded-full px-6 py-3 text-sm text-white duration-300'
                  data-anime-button
                >
                  Back to projects
                </Link>
                <Link
                  href={project.launchPath}
                  target='_blank'
                  rel='noreferrer'
                  className='hero-button-gradient hover:shadow-button relative inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white duration-300'
                  data-anime-button
                >
                  {project.launchLabel}
                </Link>
                {project.repositoryUrl !== project.launchPath && (
                  <Link
                    href={project.repositoryUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='features-button-gradient hover:shadow-button relative inline-flex items-center rounded-full px-6 py-3 text-sm text-white duration-300'
                    data-anime-button
                  >
                    View source on GitHub
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className='mt-14 grid gap-7.5 lg:grid-cols-2' data-anime-reveal>
            <div
              className='features-box-border relative rounded-lg'
              data-anime-child
            >
              <div className='box-hover box-hover-small h-full rounded-lg p-8'>
                <h3 className='text-heading-6 mb-5 font-semibold text-white'>
                  Highlights
                </h3>
                <ul className='space-y-4'>
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className='flex gap-3 font-medium'>
                      <span className='bg-purple-light mt-2 h-2 w-2 shrink-0 rounded-full'></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className='features-box-border relative rounded-lg'
              data-anime-child
            >
              <div className='box-hover box-hover-small h-full rounded-lg p-8'>
                <h3 className='text-heading-6 mb-5 font-semibold text-white'>
                  Run Locally
                </h3>
                <ol className='space-y-4'>
                  {project.runSteps.map((step, index) => (
                    <li key={step} className='flex gap-3 font-medium'>
                      <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm text-white'>
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetailsPage;
