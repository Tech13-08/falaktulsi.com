import React, { useState } from "react";
import Device from "../components/Device";
import TechnologiesModal from "../components/TechnologiesModal";
import Button from "../components/Button";
import Greeting from "../components/Greeting";
import { Link } from "react-router-dom";
import { projects } from "../content/projects";

const technologies = [
  "Python",
  "Rust",
  "Java",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
];

const recentBlog = {
  title: "Understanding Transformers",
  date: "Nov 20, 2025",
};

const recentProject = projects[0];

const Home: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [greetTrigger, setGreetTrigger] = useState("");

  const handleGreetClick = () => {
    setGreetTrigger(crypto.randomUUID());
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 gap-8">
      {showAll && (
        <TechnologiesModal
          technologies={technologies}
          onClose={() => setShowAll(false)}
        />
      )}
      <div
        className="w-full lg:w-1/3 p-6 rounded-xl shadow bg-card
                  flex flex-col justify-center
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
        className="flex-1 flex flex-col gap-8 justify-center 
                  order-1 lg:order-none"
      >
        <div>
          <h1 className="text-4xl font-bold mb-4 text-text font-mono">
            <Greeting trigger={greetTrigger} />
          </h1>
          <p className="text-lg text-textSecondary">
            My name is <span className="text-secondary">Falak</span> and I am
            currently a{" "}
            <span className="text-secondary">Computer Science Master's student at UC Riverside</span>. I have a
            strong passion for building intelligent systems that solve
            real-world problems. I enjoy experimenting with new technologies,
            contributing to open-source projects, and continuously learning to
            push the boundaries of AI and software development.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-stretch content-stretch">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 rounded shadow bg-card flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2 text-text truncate lg:whitespace-normal">
                  {recentBlog.title}
                </h3>
                <p className="text-textSecondary text-sm">{recentBlog.date}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Link key="Blogs" to="/blog">
                <Button className="h-12 text-center sm:w-fit w-full">
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

          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 rounded shadow bg-card flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2 text-text truncate lg:whitespace-normal">
                  {recentProject.title}
                </h3>
                <p className="text-textSecondary text-sm line-clamp-2 lg:line-clamp-none">
                  {recentProject.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Link key="Projects" to="/projects">
                <Button className="h-12 sm:w-fit w-full text-center leading-none">
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
