import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import Button from "../components/Button";
import { getBlogPostBySlug } from "../content/blogPosts";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const html = useMemo(() => {
    if (!post) return "";
    return marked.parse(post.content) as string;
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col p-8 gap-6 items-center">
        <div className="justify-center text-center w-full lg:w-2/3 p-6 rounded-xl shadow bg-card">
          <h1 className="text-3xl font-bold mb-4 text-text font-mono">
            Post Not Found
          </h1>
          <p className="text-lg mb-6 text-textSecondary">
            The blog post you requested does not exist.
          </p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 box-border flex justify-center px-3 md:px-6 py-8 overflow-hidden">
      <article className="w-full max-w-6xl p-8 rounded-xl shadow bg-card overflow-y-auto scrollbar-themed pr-1">
        <Link to="/blog" className="text-secondary hover:underline">
          {"<- Back to Blog"}
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-2 text-text font-mono">
          {post.title}
        </h1>
        <p className="text-textSecondary mb-3">{post.date}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wide bg-background text-textSecondary px-2 py-1 rounded border border-secondary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="blog-content text-text"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {post.keywords.length > 0 && (
          <p className="mt-8 text-sm text-textSecondary">
            Keywords: <span className="text-text">{post.keywords.join(", ")}</span>
          </p>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
