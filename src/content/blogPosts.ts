import taxonomy from "./blogTaxonomy.json";

export interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  summary: string;
  keywords: string[];
  tags: string[];
  content: string;
}

export const BLOG_TAG_OPTIONS = (taxonomy as string[]).map((tag) =>
  tag.toLowerCase(),
);

const BLOG_TAG_SET = new Set<string>(BLOG_TAG_OPTIONS);

type Frontmatter = {
  title?: string;
  date?: string;
  summary?: string;
  slug?: string;
  keywords?: string;
  tags?: string;
};

const markdownModules = import.meta.glob("./blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const toKebab = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { frontmatter: {} as Frontmatter, markdown: raw };
  }

  const frontmatter: Frontmatter = {};

  match[1].split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (!value) return;

    if (key === "title") frontmatter.title = value;
    if (key === "date") frontmatter.date = value;
    if (key === "summary") frontmatter.summary = value;
    if (key === "slug") frontmatter.slug = value;
    if (key === "keywords") frontmatter.keywords = value;
    if (key === "tags") frontmatter.tags = value;
  });

  return { frontmatter, markdown: raw.slice(match[0].length) };
};

const deriveTitle = (markdown: string, fallback: string) => {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading?.[1]?.trim() || fallback;
};

const deriveSummary = (markdown: string) => {
  const blocks = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const paragraph = blocks.find(
    (block) =>
      !block.startsWith("#") &&
      !block.startsWith("-") &&
      !block.startsWith("*") &&
      !/^\d+\./.test(block),
  );

  if (!paragraph) return "";
  return paragraph.length > 180 ? `${paragraph.slice(0, 177)}...` : paragraph;
};

const parseCsv = (raw?: string) => {
  if (!raw) return [];

  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .filter((item, index, arr) => arr.indexOf(item) === index);
};

const parseTags = (raw?: string) => {
  return parseCsv(raw).filter((tag) => BLOG_TAG_SET.has(tag));
};

const parseDateFromFileName = (fileName: string) => {
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "1970-01-01";
};

export const blogPosts: BlogPostItem[] = Object.entries(markdownModules)
  .filter(([path]) => !path.endsWith("_template-technical-journey.md"))
  .map(([path, raw]) => {
    const fileName = path.split("/").pop() || "";
    const baseName = fileName.replace(/\.md$/, "");
    const fallbackTitle = baseName
      .replace(/^\d{4}-\d{2}-\d{2}-?/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const { frontmatter, markdown } = parseFrontmatter(raw);
    const title = frontmatter.title || deriveTitle(markdown, fallbackTitle);
    const tags = parseTags(frontmatter.tags);
    const keywords = parseCsv(frontmatter.keywords);

    return {
      slug: frontmatter.slug || toKebab(title),
      title,
      date: frontmatter.date || parseDateFromFileName(baseName),
      summary: frontmatter.summary || deriveSummary(markdown),
      keywords,
      tags,
      content: markdown,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
