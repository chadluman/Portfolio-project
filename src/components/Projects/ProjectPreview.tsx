import { Project } from "@/data/projects";
import Image from "next/image";

const ProjectPreview = ({ project }: { project: Project }) => {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-dark shadow-dark">
      <Image
        src={project.previewImage}
        alt={project.previewAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent"></div>
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-full border border-white/15 bg-dark/75 px-3 py-2 text-white shadow-dark backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-300"></span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider">
          {project.imageLabel}
        </span>
      </div>
    </div>
  );
};

export default ProjectPreview;
