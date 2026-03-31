import React, { useState } from "react";
import educationData from "../content/education.json";
import Button from "./Button";

interface EducationItem {
  title: string;
  years: string;
  details: string;
  url: string;
  courses?: string[];
}

const education: EducationItem[] = educationData as EducationItem[];

const getLatestYear = (years: string) => {
  const matches = years.match(/\d{4}/g);
  if (!matches || matches.length === 0) return Number.NEGATIVE_INFINITY;
  return Math.max(...matches.map((value) => Number(value)));
};

const educationSorted: EducationItem[] = [...education].sort(
  (a, b) => getLatestYear(b.years) - getLatestYear(a.years),
);

const EducationTimeline: React.FC = () => {
  const [index, setIndex] = useState(0);
  const items = educationSorted;

  if (items.length === 0) {
    return (
      <div className="w-full p-4 rounded-xl bg-cardSecondary text-textSecondary">
        No education entries yet.
      </div>
    );
  }

  const current = items[index];

  const prev = () => {
    setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="w-full flex flex-col min-h-0 gap-4">
      <a
        href={current.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-l-4 border-secondary pl-4 block hover:opacity-80 transition"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="shrink-0">
            <h3 className="text-xl font-bold text-text underline-offset-2 hover:underline">
              {current.title}
            </h3>
            <p className="text-textSecondary text-sm mt-1">{current.years}</p>
            <p className="text-textSecondary text-sm mt-2">{current.details}</p>
          </div>
          
          {current.courses && current.courses.length > 0 && (
            <div className="flex-1 mt-3 md:mt-0">
              <p className="text-xs text-textSecondary font-semibold mb-2 md:text-right">Relevant Courses:</p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {current.courses.map((course, i) => (
                  <span key={i} className="text-xs bg-background text-text px-2 py-1 rounded border border-secondary/20">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </a>

      <div className="flex items-center justify-between gap-3 shrink-0">
        <Button onClick={prev} size="sm">← Prev</Button>
        <p className="text-xs text-textSecondary">
          {index + 1} / {items.length}
        </p>
        <Button onClick={next} size="sm">Next →</Button>
      </div>
    </div>
  );
};

export default EducationTimeline;
