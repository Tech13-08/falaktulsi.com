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
    <div className="h-full min-h-0 box-border flex justify-center px-4 md:px-8 py-8 overflow-hidden">
      <article className="w-full max-w-4xl p-6 rounded-xl shadow bg-card overflow-y-auto scrollbar-themed pr-1">
        <Link to="/blog" className="text-secondary hover:underline">
          {"<- Back to Blog"}
        </Link>
        <h1 className="text-4xl font-bold mt-4 mb-2 text-text font-mono">
          {post.title}
        </h1>
        <p className="text-textSecondary mb-6">{post.date}</p>
        <div
          className="blog-content text-text"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
