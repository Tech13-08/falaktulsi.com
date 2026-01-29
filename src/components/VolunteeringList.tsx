import React, { useState } from "react";
import Button from "./Button";

interface VolunteeringItem {
  org: string;
  role: string;
  link: string;
  bullets: string[];
}

const volunteering: VolunteeringItem[] = [
  {
    org: "Cerritos Library",
    role: "Tech Tutor",
    link: "https://www.cerritoslibrary.us/",
    bullets: [
      "Helped students with computer basics",
      "Explained programming fundamentals",
      "Assisted elderly visitors with device setup",
    ],
  },
  {
    org: "Local Food Bank",
    role: "Volunteer",
    link: "https://www.foodbankoc.org/",
    bullets: [
      "Sorted and packaged donations",
      "Distributed supplies to families",
    ],
  },
  {
    org: "Local Food Bank",
    role: "Volunteer",
    link: "https://www.foodbankoc.org/",
    bullets: [
      "Sorted and packaged donations",
      "Distributed supplies to families",
    ],
  },
];

const VolunteeringList: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? volunteering.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === volunteering.length - 1 ? 0 : i + 1));
  };

  const current = volunteering[index];

  return (
    <div className="flex flex-col items-center w-full mx-auto max-h-lg">
      <a
        href={current.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
      block w-full p-6 rounded-xl bg-cardSecondary 
      text-text transition-all shadow
      border border-card hover:border-secondary 
      hover:shadow-lg
      mb-4
    "
      >
        <h3 className="text-xl font-bold font-mono text-text">{current.org}</h3>
        <p className="text-textSecondary mb-3">{current.role}</p>

        <ul className="list-disc list-inside text-textSecondary">
          {current.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </a>

      <div className="flex gap-4 mt-auto">
        <Button onClick={prev}>← Prev</Button>
        <Button onClick={next}>Next →</Button>
      </div>
    </div>
  );
};

export default VolunteeringList;
