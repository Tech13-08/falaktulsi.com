import React from "react";
import DevpostIcon from "../assets/Devpost.svg?react";
import LinkedinIcon from "../assets/Linkedin.svg?react";
import GithubIcon from "../assets/Github.svg?react";
import { ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between items-center p-6 mt-auto">
      <div className="text-text">Made by Falak Tulsi</div>
      <div className="flex space-x-4 text-text">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 hover:text-secondary"
        >
          <span>Resume</span>
          <ExternalLink size={15} />
        </a>

        <a
          href="https://github.com/Tech13-08"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary"
        >
          <GithubIcon className="w-5 h-5 fill-current" />
        </a>

        <a
          href="https://www.linkedin.com/in/falak-tulsi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary"
        >
          <LinkedinIcon className="w-5 h-5 fill-current" />
        </a>

        <a
          href="https://devpost.com/Tech13-08"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-secondary"
        >
          <DevpostIcon className="w-5 h-5 fill-current" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
