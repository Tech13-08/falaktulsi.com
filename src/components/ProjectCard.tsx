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

  const highlightMatch = (text: string, query?: string, limit?: number) => {
    if (!query) {
      if (limit && text.length > limit) {
        return text.slice(0, limit) + "...";
      }
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    const matchRegex = new RegExp(`^(${query})$`, "i");

    if (!limit || text.length <= limit) {
      return parts.map((part, i) =>
        matchRegex.test(part) ? (
          <span key={i} className="bg-yellow-400/70 text-text font-bold">
            {part}
          </span>
        ) : (
          part
        ),
      );
    }

    let charCount = 0;
    const result: React.ReactNode[] = [];
    let truncated = false;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      const isMatch = matchRegex.test(part);

      if (charCount >= limit) {
        truncated = true;
        break;
      }

      if (isMatch) {
        result.push(
          <span key={i} className="bg-yellow-400/70 text-text font-bold">
            {part}
          </span>
        );
        charCount += part.length;
      } else {
        if (charCount + part.length > limit) {
          result.push(part.slice(0, limit - charCount));
          charCount = limit;
          truncated = true;
          break;
        } else {
          result.push(part);
          charCount += part.length;
        }
      }
    }

    if (truncated) {
      result.push("...");
    }

    return result;
  };

  return (
    <div className="bg-card rounded-xl shadow overflow-hidden flex flex-col w-full max-w-xs min-h-[20rem]">
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
              {highlightMatch(description, query, descriptionLimit)}{" "}
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
