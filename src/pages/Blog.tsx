import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_TAG_OPTIONS, blogPosts } from "../content/blogPosts";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const stripMarkdown = (markdown: string) =>
  markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[>*_~-]/g, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const highlightMatch = (text: string, query: string) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return text;

  const regex = new RegExp(`(${escapeRegExp(trimmedQuery)})`, "gi");
  const parts = text.split(regex);
  const matchRegex = new RegExp(`^(${escapeRegExp(trimmedQuery)})$`, "i");

  return parts.map((part, index) =>
    matchRegex.test(part) ? (
      <span key={`${part}-${index}`} className="bg-yellow-400/70 text-text font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const buildExcerpt = (text: string, query: string, maxLength = 180) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return "";

  const lowerText = text.toLowerCase();
  const lowerQuery = trimmedQuery.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return text.length > maxLength ? `${text.slice(0, maxLength - 3).trimEnd()}...` : text;
  }

  const halfWindow = Math.floor(maxLength / 2);
  let start = Math.max(0, matchIndex - halfWindow);
  let end = Math.min(text.length, matchIndex + trimmedQuery.length + halfWindow);

  while (start > 0 && !/\s/.test(text[start - 1])) start -= 1;
  while (end < text.length && !/\s/.test(text[end])) end += 1;

  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";

  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
};

const Blog: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "title-asc" | "title-desc"
  >("date-desc");

  const allTags = useMemo(() => [...BLOG_TAG_OPTIONS], []);

  const filteredAndSortedPosts = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    const filtered = blogPosts.filter((post) => {
      const queryMatch =
        !lowerQuery ||
        post.title.toLowerCase().includes(lowerQuery) ||
        post.summary.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.keywords.some((keyword) => keyword.includes(lowerQuery));

      const tagsMatch =
        activeTags.length === 0 ||
        activeTags.some((tag) => post.tags.includes(tag));

      return queryMatch && tagsMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date-desc") return b.date.localeCompare(a.date);
      if (sortBy === "date-asc") return a.date.localeCompare(b.date);
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return sorted;
  }, [query, activeTags, sortBy]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="h-full min-h-0 box-border flex justify-center px-3 md:px-6 py-8 overflow-hidden">
      <div className="w-full max-w-6xl h-full min-h-0 flex flex-col gap-6 overflow-hidden">
        <div className="p-6 rounded-xl shadow bg-card">
          <h1 className="text-4xl font-bold mb-2 text-text font-mono">Blog</h1>
        </div>

        <div className="p-4 rounded-xl shadow bg-card flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="blog-search md:col-span-2 w-full p-3 border border-secondary/30 bg-background rounded-lg text-text outline-none focus:border-secondary"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "date-desc"
                    | "date-asc"
                    | "title-asc"
                    | "title-desc",
                )
              }
              className="blog-select w-full p-3 border border-secondary/30 bg-background rounded-lg text-text outline-none focus:border-secondary"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`blog-tag px-3 py-1.5 rounded-full border text-sm ${
                      active ? "blog-tag-active" : ""
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-themed pr-1 flex flex-col gap-6 pb-2">
          {filteredAndSortedPosts.map((post) => (
            <article key={post.slug} className="p-6 rounded-xl shadow bg-card">
              {(() => {
                const trimmedQuery = query.trim();
                const lowerQuery = trimmedQuery.toLowerCase();
                const contentText = stripMarkdown(post.content);
                const titleHasQuery = lowerQuery ? post.title.toLowerCase().includes(lowerQuery) : false;
                const summaryHasQuery = lowerQuery ? post.summary.toLowerCase().includes(lowerQuery) : false;
                const contentHasQuery = lowerQuery ? contentText.toLowerCase().includes(lowerQuery) : false;
                const keywordHits = trimmedQuery
                  ? post.keywords.filter((keyword) => keyword.includes(lowerQuery))
                  : [];

                if (!trimmedQuery) return null;

                if (!titleHasQuery && !summaryHasQuery && contentHasQuery) {
                  return (
                    <p className="text-textSecondary mb-3 text-sm border-l-2 border-secondary/30 pl-3 italic">
                      {highlightMatch(buildExcerpt(contentText, trimmedQuery), trimmedQuery)}
                    </p>
                  );
                }

                if (!titleHasQuery && !summaryHasQuery && keywordHits.length > 0) {
                  return (
                    <p className="text-textSecondary mb-3 text-sm border-l-2 border-secondary/30 pl-3">
                      Matched keyword: {highlightMatch(keywordHits.join(", "), trimmedQuery)}
                    </p>
                  );
                }

                return null;
              })()}
              <p className="text-sm text-textSecondary mb-2">{post.date}</p>
              <h2 className="text-2xl font-bold text-text mb-2">
                {highlightMatch(post.title, query)}
              </h2>
              <p className="text-textSecondary mb-4">
                {highlightMatch(post.summary, query)}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="px-2 py-1 rounded-full bg-background text-textSecondary text-xs border border-secondary/30"
                    >
                      {highlightMatch(tag, query)}
                    </span>
                  ))}
                </div>
              )}
              <Link to={`/blog/${post.slug}`} className="text-secondary hover:underline">
                Read Post
              </Link>
            </article>
          ))}

          {filteredAndSortedPosts.length === 0 && (
            <div className="p-6 rounded-xl shadow bg-card text-textSecondary">
              No posts match your current search/filter selection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
