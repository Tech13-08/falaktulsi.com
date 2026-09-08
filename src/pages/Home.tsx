import React, { useState } from "react";
import Device from "../components/Device";
import TechnologiesModal from "../components/TechnologiesModal";
import Button from "../components/Button";
import Greeting from "../components/Greeting";
import { Link } from "react-router-dom";
import { projects } from "../content/projects";
import { blogPosts } from "../content/blogPosts";
import { technologies } from "../content/technologies";

const recentBlog = blogPosts[0];
const recentProject = projects[projects.length - 1];

const experienceHighlights = [
  {
    company: "Juniper Square",
    metric: "AI telemetry · 70+ eng",
  },
  {
    company: "HP",
    metric: "LLM infra · 60% faster",
  },
  {
    company: "Neoboard",
    metric: "UI · 10k+ students",
  },
] as const;

const Home: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [greetTrigger, setGreetTrigger] = useState("");

  const handleGreetClick = () => {
    setGreetTrigger(crypto.randomUUID());
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-8 gap-6 lg:gap-8 h-full overflow-y-auto lg:overflow-hidden scrollbar-themed">
      {showAll && (
        <TechnologiesModal
          technologies={technologies}
          onClose={() => setShowAll(false)}
        />
      )}
      <div
        className="w-full lg:w-1/3 p-6 rounded-xl shadow bg-card
                  flex flex-col justify-center lg:self-center
                  order-2 lg:order-none"
      >
        <Device
          technologies={technologies}
          onToggleAll={(enabled) => setShowAll(enabled)}
          showAll={showAll}
          onGreetClick={handleGreetClick}
        />
      </div>
      <div
        className="flex-1 flex flex-col gap-4 justify-center min-h-0
                  order-1 lg:order-none"
      >
        <div className="shrink-0">
          <h1 className="text-4xl font-bold mb-2 text-text font-mono">
            <Greeting trigger={greetTrigger} />
          </h1>
          <p className="text-base lg:text-lg text-textSecondary leading-snug">
            My name is <span className="text-secondary">Falak</span> and I am a{" "}
            <span className="text-secondary">Computer Science Master's student at UC Riverside</span>. I recently completed an AI Engineer internship at Juniper Square (June–August 2026).{" "}
            <span className="text-secondary">I'm open to full-time Software Engineer & AI roles.</span>{" "}
            I have a strong passion for building intelligent systems that have real impact. I enjoy experimenting with new technologies,
            building software I actually use, and continuously learning to
            push the boundaries of AI and engineering.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {experienceHighlights.slice(0, 3).map((item) => (
              <Link
                key={item.company}
                to="/resume"
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-secondary/25 bg-card px-2.5 py-1 text-xs hover:border-secondary/60 transition-colors"
              >
                <span className="font-semibold text-text whitespace-nowrap">{item.company}</span>
                <span className="text-textSecondary">·</span>
                <span className="text-secondary truncate">{item.metric}</span>
              </Link>
            ))}
            {experienceHighlights.length > 3 && (
              <Link
                to="/resume"
                className="inline-flex items-center rounded-full border border-secondary/25 bg-card px-2.5 py-1 text-xs font-semibold text-secondary hover:border-secondary/60 transition-colors"
              >
                +{experienceHighlights.length - 3} more
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 items-stretch content-stretch shrink-0 max-h-[38%] lg:max-h-[34%]">
          <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <Link
              to={`/blog/${recentBlog?.slug}`}
              className="flex-1 min-h-0 overflow-hidden p-3 rounded shadow bg-card flex flex-col justify-center hover:shadow-lg transition-shadow"
            >
              <div className="min-h-0 overflow-hidden">
                <h3 className="font-bold text-base mb-1 text-text truncate">
                  {recentBlog?.title || "No blog posts yet"}
                </h3>
                <p className="text-textSecondary text-xs truncate">
                  {recentBlog?.date || "Add your first post to get started"}
                </p>
              </div>
            </Link>
            <div className="flex justify-center mt-2 shrink-0">
              <Link key="Blogs" to="/blog">
                <Button size="sm" className="h-9 text-center sm:w-fit w-full">
                  <span className="hidden [@media(min-width:406px)]:inline">
                    See More Blogs
                  </span>
                  <span className="[@media(min-width:406px)]:hidden">
                    <span className="block leading-none">See More</span>
                    <span className="block leading-none">Blogs</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <Link
              to={`/projects?q=${encodeURIComponent(recentProject?.title || "")}`}
              className="flex-1 min-h-0 overflow-hidden p-3 rounded shadow bg-card flex flex-col justify-center hover:shadow-lg transition-shadow"
            >
              <div className="min-h-0 overflow-hidden">
                <h3 className="font-bold text-base mb-1 text-text truncate">
                  {recentProject?.title || "No projects yet"}
                </h3>
                <p className="text-textSecondary text-xs line-clamp-2 break-words">
                  {recentProject?.description || "Add your first project to highlight your work."}
                </p>
              </div>
            </Link>
            <div className="flex justify-center mt-2 shrink-0">
              <Link key="Projects" to="/projects">
                <Button size="sm" className="h-9 sm:w-fit w-full text-center leading-none">
                  See More Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
