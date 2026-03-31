import React, { useState } from "react";
import Button from "./Button";
import volunteeringData from "../content/volunteering.json";

interface VolunteeringItem {
  org: string;
  role: string;
  years?: string;
  link: string;
  bullets: string[];
}

const volunteering: VolunteeringItem[] = volunteeringData as VolunteeringItem[];

const VolunteeringList: React.FC = () => {
  const [index, setIndex] = useState(0);

  if (volunteering.length === 0) {
    return (
      <div className="w-full p-4 rounded-xl bg-cardSecondary text-textSecondary">
        No volunteering entries yet.
      </div>
    );
  }

  const prev = () => {
    setIndex((i) => (i === 0 ? volunteering.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === volunteering.length - 1 ? 0 : i + 1));
  };

  const current = volunteering[index];

  return (
    <div className="flex flex-col items-center w-full h-full min-h-0 mx-auto">
      <a
        href={current.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
      block w-full p-6 rounded-xl bg-cardSecondary 
      text-text transition-all shadow
      border border-card hover:border-secondary 
      hover:shadow-lg
      mb-4 flex-1 overflow-y-auto
    "
      >
        <h3 className="text-xl font-bold font-mono text-text">{current.org}</h3>
        <p className="text-textSecondary">{current.role}</p>
        {current.years && (
          <p className="text-sm text-textSecondary mb-3">Years: {current.years}</p>
        )}
        {!current.years && <div className="mb-3" />}

        <ul className="list-disc list-inside text-textSecondary">
          {current.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </a>

      <div className="flex gap-4 mt-auto shrink-0">
        <Button onClick={prev}>← Prev</Button>
        <Button onClick={next}>Next →</Button>
      </div>
    </div>
  );
};

export default VolunteeringList;
