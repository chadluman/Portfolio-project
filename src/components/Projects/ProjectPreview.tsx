import { Project } from "@/data/projects";

const ProjectPreview = ({ project }: { project: Project }) => {
  return (
    <div
      className={`relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br ${project.accent} p-5 text-dark shadow-dark`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full bg-dark/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {project.imageLabel}
        </span>
        <span className="h-3 w-3 rounded-full bg-dark/70"></span>
      </div>

      <div className="relative z-10 mt-10 rounded-lg bg-dark/85 p-4 text-white backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-300"></span>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-white/80"></div>
          <div className="h-3 w-full rounded-full bg-white/35"></div>
          <div className="h-3 w-2/3 rounded-full bg-white/25"></div>
        </div>
      </div>

      <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
        <span className="h-14 rounded-md bg-white/35"></span>
        <span className="h-14 rounded-md bg-white/25"></span>
        <span className="h-14 rounded-md bg-white/30"></span>
      </div>
    </div>
  );
};

export default ProjectPreview;
