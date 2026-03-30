import React, { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../content/projects";

const Projects: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;

    const lowerQuery = query.toLowerCase();

    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery),
    );
  }, [query]);

  return (
    <div className="h-full min-h-0 box-border flex justify-center p-6 overflow-hidden">
      <div className="w-full max-w-6xl h-full min-h-0 flex flex-col gap-6 overflow-hidden">
        <h1 className="text-4xl font-bold text-text font-mono text-center">
          Projects
        </h1>
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="projects-search w-full p-3 border border-secondary/30 bg-card rounded-lg text-text outline-none focus:border-secondary"
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-start auto-rows-max content-start overflow-y-auto scrollbar-projects pr-1 pb-2 flex-1 min-h-0"
        >
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              description={p.description}
              code={p.code}
              demo={p.demo}
              image={p.image}
              query={query}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
