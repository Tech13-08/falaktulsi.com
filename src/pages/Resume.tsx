import React from "react";

const Resume: React.FC = () => {
  return (
    <div className="h-full min-h-0 box-border flex justify-center px-3 md:px-6 py-6 overflow-hidden">
      <div className="w-full max-w-6xl h-full min-h-0 flex flex-col gap-4">
        <div className="flex items-center justify-between p-4 rounded-xl shadow bg-card">
          <h1 className="text-2xl md:text-3xl font-bold text-text font-mono">Resume</h1>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            Open in new tab
          </a>
        </div>

        <div className="flex-1 min-h-0 rounded-xl shadow bg-card overflow-hidden">
          <iframe
            src="/resume.pdf#view=FitH"
            title="Resume PDF"
            className="w-full h-full border-0"
          />
        </div>

        <p className="text-sm text-textSecondary px-1">
          If the resume preview does not load in your browser, use the
          {" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            direct PDF link
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Resume;