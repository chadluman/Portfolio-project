import SectionTitle from "@/components/Common/SectionTitle";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = () => {
  return (
    <section className="overflow-hidden pb-17.5 pt-10 lg:pb-22.5 xl:pb-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Portfolio"
          title="Featured Projects"
          paragraph="A selection of front-end, full-stack, and workflow-focused projects from the local project archive."
        />

        <div className="grid gap-7.5 md:grid-cols-2" data-anime-reveal>
          {projects.map((project) => (
            <div key={project.slug} data-anime-child>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
