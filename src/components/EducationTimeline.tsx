import React from "react";

const education = [
  {
    title: "Cypress College",
    years: "2021 – 2023",
    details: "Computer Science AS-T, Honors Program",
    url: "https://www.cypresscollege.edu/",
  },
  {
    title: "UC Irvine",
    years: "2023 – 2025",
    details: "B.S. in Computer Science, AI/ML focus",
    url: "https://uci.edu/",
  },
];

const EducationTimeline: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {education.map((item) => (
        <a
          key={item.title}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-l-4 border-secondary pl-4 block hover:opacity-80 transition"
        >
          <h3 className="text-xl font-bold text-text underline-offset-2 hover:underline">
            {item.title}
          </h3>

          <p className="text-textSecondary text-sm">{item.years}</p>
          <p className="text-textSecondary text-sm mt-1">{item.details}</p>
        </a>
      ))}
    </div>
  );
};

export default EducationTimeline;
