import { Project } from "@/data/projects";
import Link from "next/link";
import ProjectPreview from "./ProjectPreview";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
      data-anime-card
    >
      <article className="features-box-border relative h-full rounded-lg">
        <div className="box-hover box-hover-small h-full overflow-hidden rounded-lg p-4">
          <ProjectPreview project={project} />
          <div className="relative z-20 pt-6">
            <h3 className="mb-3 text-heading-6 font-semibold text-white">
              {project.title}
            </h3>
            <p className="mb-5 font-medium">{project.summary}</p>
            <span className="features-button-gradient relative inline-flex items-center rounded-full px-5 py-2.5 text-sm text-white duration-300 group-hover:shadow-button">
              View project
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
