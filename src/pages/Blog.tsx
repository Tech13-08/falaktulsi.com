import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col p-8 gap-6 items-center">
      <div className="justify-center text-center w-full lg:w-2/3 p-6 rounded-xl shadow bg-card">
        <h1 className="text-4xl font-bold mb-4 text-text font-mono">Blog</h1>
        <p className="text-lg mb-6 text-textSecondary">
          This section is in progress. More posts will be published soon.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/projects">
            <Button variant="secondary">See Projects</Button>
          </Link>
          <Link to="/contact">
            <Button>Contact Me</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
