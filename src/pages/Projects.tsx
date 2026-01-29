import React, { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";

const Projects: React.FC = () => {
  const [query, setQuery] = useState("");

  const projects = useMemo(
    () => [
      {
        title: "AI Chatbot",
        description:
          "A chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models.A chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT modelsA chatbot that answers technical questions using GPT models",
        code: "https://github.com/example/chatbot",
        demo: "https://example.com/chatbot-demo",
        image: "",
      },
      {
        title: "Portfolio Website",
        description: "A modern personal website built with React + Tailwind.",
        code: "https://github.com/example/portfolio",
      },
      {
        title: "Image Classifier",
        description: "CNN model to classify images using TensorFlow.",
        demo: "https://example.com/classifier",
      },
      {
        title: "Rust CLI Tool",
        description: "A fast command-line utility written in Rust.",
        code: "https://github.com/example/rust-cli",
      },
    ],
    [],
  );
  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;

    const lowerQuery = query.toLowerCase();

    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery),
    );
  }, [query, projects]);

  const footerHeight = 24;
  const maxGridHeight = `calc(100vh - ${footerHeight}rem)`;

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-text mb-4 font-mono text-center">
          Projects
        </h1>
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-border bg-card rounded-lg text-text outline-none focus:border-secondary"
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center overflow-y-auto scrollbar-themed"
          style={{ maxHeight: maxGridHeight }}
        >
          {filteredProjects.map((p, index) => (
            <ProjectCard
              key={index}
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
