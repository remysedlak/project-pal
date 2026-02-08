import { useState } from "react";

import type { Project } from "./ProjectTypes";

type ProjectListProps = {
  projects: Project[];
  onOpen: (projectId: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
};

export default function ProjectList({ projects, onOpen, onEdit, onDelete }: ProjectListProps) {
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);

  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <div key={project.id} className="rounded-2xl border border-gray-800 bg-gray-950/40 p-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-100 break-words">{project.name}</h2>
            <p className="mt-1 text-sm text-gray-300 break-words">{project.description}</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
              Next deadline: {project.nextDeadline || "Not set"}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-gray-500">
              Last updated: {project.lastUpdated}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                className="rounded-lg border border-gray-700 px-2 py-1 text-xs text-gray-300 transition hover:border-gray-500 hover:text-white"
                onClick={() => onOpen(project.id)}
              >
                Open
              </button>
              <button
                className="rounded-lg border border-gray-700 px-2 py-1 text-xs text-gray-300 transition hover:border-gray-500 hover:text-white"
                onClick={() => onEdit(project)}
              >
                Edit
              </button>
              {confirmingDeleteId === project.id ? (
                <>
                  <span className="text-[10px] uppercase tracking-wider text-rose-200/80">
                    Are you sure?
                  </span>
                  <button
                    className="rounded-lg border border-gray-700 px-2 py-1 text-xs text-gray-300 transition hover:border-gray-500 hover:text-white"
                    onClick={() => setConfirmingDeleteId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-lg border border-rose-400/80 bg-rose-500/10 px-2 py-1 text-xs text-rose-200 transition hover:border-rose-300 hover:text-rose-100"
                    onClick={() => {
                      setConfirmingDeleteId(null);
                      onDelete(project.id);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="rounded-lg border border-rose-400/60 px-2 py-1 text-xs text-rose-300 transition hover:border-rose-300 hover:text-rose-200"
                  onClick={() => setConfirmingDeleteId(project.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-800 bg-gray-900 px-2 py-1 text-[10px] font-medium text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-700 p-6 text-center text-sm text-gray-400">
          No projects yet. Use the + button to add one.
        </div>
      )}
    </div>
  );
}
