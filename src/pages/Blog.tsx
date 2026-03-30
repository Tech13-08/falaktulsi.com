import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_TAG_OPTIONS, blogPosts } from "../content/blogPosts";

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
    <div className="h-full min-h-0 box-border flex justify-center p-8 overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col gap-6 overflow-y-auto scrollbar-themed pr-1">
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

        {filteredAndSortedPosts.map((post) => (
          <article key={post.slug} className="p-6 rounded-xl shadow bg-card">
            <p className="text-sm text-textSecondary mb-2">{post.date}</p>
            <h2 className="text-2xl font-bold text-text mb-2">{post.title}</h2>
            <p className="text-textSecondary mb-4">{post.summary}</p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={`${post.slug}-${tag}`}
                    className="px-2 py-1 rounded-full bg-background text-textSecondary text-xs border border-secondary/30"
                  >
                    {tag}
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
  );
};

export default Blog;
