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
  const seeMoreLabel = "See more";
  const seeMoreReserveChars = 1;
  const collapsedDescriptionLimit = Math.max(
    24,
    descriptionLimit - seeMoreReserveChars,
  );
  const safeDescription = description || "";

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const buildExcerpt = (text: string, search: string, limit: number) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch || text.length <= limit) {
      return text.length > limit ? `${text.slice(0, limit)}...` : text;
    }

    const lowerText = text.toLowerCase();
    const lowerSearch = trimmedSearch.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerSearch);

    if (matchIndex === -1) {
      return text.length > limit ? `${text.slice(0, limit)}...` : text;
    }

    const windowSize = Math.max(limit, trimmedSearch.length + 24);
    const halfWindow = Math.floor(windowSize / 2);

    let start = Math.max(0, matchIndex - halfWindow);
    let end = Math.min(text.length, matchIndex + trimmedSearch.length + halfWindow);

    while (start > 0 && !/\s/.test(text[start - 1])) {
      start -= 1;
    }

    while (end < text.length && !/\s/.test(text[end])) {
      end += 1;
    }

    const prefix = start > 0 ? "..." : "";
    const suffix = end < text.length ? "..." : "";

    return `${prefix}${text.slice(start, end).trim()}${suffix}`;
  };

  const highlightMatch = (text: string, query?: string, limit?: number) => {
    const safeText = text || "";
    const trimmedQuery = query?.trim();

    if (!trimmedQuery) {
      if (limit && safeText.length > limit) {
        return safeText.slice(0, limit) + "...";
      }
      return safeText;
    }

    const escapedQuery = escapeRegExp(trimmedQuery);
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = safeText.split(regex);
    const matchRegex = new RegExp(`^(${escapedQuery})$`, "i");

    if (!limit || safeText.length <= limit) {
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

  const renderDescriptionPreview = () => {
    if (!query) {
      return highlightMatch(safeDescription, query, collapsedDescriptionLimit);
    }

    return highlightMatch(
      buildExcerpt(safeDescription, query, collapsedDescriptionLimit),
      query,
    );
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = DefaultImage;
  };

  return (
    <div className="bg-card rounded-xl shadow overflow-hidden flex flex-col w-full max-w-xs min-h-[20rem]">
      {!expanded && (
        <div className="h-40 w-full">
          <img
            src={image || DefaultImage}
            alt={title}
            className="w-full h-full object-fill"
            onError={handleImageError}
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-text mb-2 truncate">
          {highlightMatch(title, query)}
        </h3>
        <div className="text-textSecondary text-sm flex-1 relative">
          {!expanded ? (
            <div className="leading-5">
              <span>{renderDescriptionPreview()} </span>
              {safeDescription.length > collapsedDescriptionLimit && (
                <button
                  className="text-textSecondary underline font-semibold inline"
                  onClick={() => setExpanded(true)}
                >
                  {seeMoreLabel}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-auto max-h-56 pr-1">
                {highlightMatch(safeDescription, query)}
              </div>

              {safeDescription.length > collapsedDescriptionLimit && (
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
