import React, { useState } from "react";
import Button from "./Button";
import DefaultImage from "../assets/default-project.png";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  code?: string;
  demo?: string;
  query?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  code,
  demo,
  query,
}) => {
  const buttonWidth = "8rem";
  const [expanded, setExpanded] = useState(false);
  const descriptionLimit = 75;

  const highlightMatch = (text: string, query?: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-400/70 text-text font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="bg-card rounded-xl shadow overflow-hidden flex flex-col w-full max-w-xs">
      {!expanded && (
        <div className="h-40 w-full">
          <img
            src={image || DefaultImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-text mb-2 truncate">
          {highlightMatch(title, query)}
        </h3>
        <div className="text-textSecondary text-sm flex-1 relative">
          {!expanded ? (
            <span>
              {description.length > descriptionLimit
                ? highlightMatch(
                    description.slice(0, descriptionLimit) + "...",
                    query,
                  )
                : highlightMatch(description, query)}{" "}
              {description.length > descriptionLimit && (
                <button
                  className="text-textSecondary underline font-semibold inline"
                  onClick={() => setExpanded(true)}
                >
                  see more
                </button>
              )}
            </span>
          ) : (
            <>
              <div className="overflow-auto max-h-56 pr-1">
                {highlightMatch(description, query)}
              </div>

              {description.length > descriptionLimit && (
                <button
                  className="text-textSecondary underline font-semibold mt-2 inline-block"
                  onClick={() => setExpanded(false)}
                >
                  see less
                </button>
              )}
            </>
          )}
        </div>

        {(code || demo) && !expanded && (
          <div className="flex mt-4">
            {code && !demo && (
              <Button
                className="text-center"
                style={{ width: `${buttonWidth}` }}
                onClick={() => window.open(code, "_blank")}
              >
                Source
              </Button>
            )}

            {!code && demo && (
              <div className="ml-auto">
                <Button
                  className="text-center"
                  style={{ width: `${buttonWidth}` }}
                  onClick={() => window.open(demo, "_blank")}
                  variant="secondary"
                >
                  Demo
                </Button>
              </div>
            )}

            {code && demo && (
              <>
                <Button
                  className="text-center"
                  style={{ width: `${buttonWidth}` }}
                  onClick={() => window.open(code, "_blank")}
                >
                  Source
                </Button>
                <Button
                  className="text-center ml-auto"
                  style={{ width: `${buttonWidth}` }}
                  onClick={() => window.open(demo, "_blank")}
                  variant="secondary"
                >
                  Demo
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
