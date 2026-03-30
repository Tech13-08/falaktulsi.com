import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "src", "content");
const taxonomyPath = path.join(contentDir, "blogTaxonomy.json");
const blogDir = path.join(contentDir, "blog");
const projectsPath = path.join(contentDir, "projects.json");

const usage = `
Content Admin Commands

Tags
  node scripts/content-admin.mjs tags list
  node scripts/content-admin.mjs tags add <tag>
  node scripts/content-admin.mjs tags remove <tag>

Blogs
  node scripts/content-admin.mjs blogs list
  node scripts/content-admin.mjs blogs add-tag <slug> <tag>
  node scripts/content-admin.mjs blogs remove-tag <slug> <tag>

Projects
  node scripts/content-admin.mjs projects list
  node scripts/content-admin.mjs projects add --name "Name" --description "Desc" [--source "url"] [--demo "url"] [--image "path"]
  node scripts/content-admin.mjs projects update --id "project-id" [--name "New"] [--description "New"] [--source "url"] [--demo "url"] [--image "path"]
  node scripts/content-admin.mjs projects remove --id "project-id"
`;

const normalizeTag = (tag) => tag.trim().toLowerCase();

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const parseFlags = (args) => {
  const flags = {};

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith("--")) continue;

    const key = token.slice(2);
    const value = args[i + 1];

    if (!value || value.startsWith("--")) {
      flags[key] = true;
      continue;
    }

    flags[key] = value;
    i += 1;
  }

  return flags;
};

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) return { frontmatter: {}, body: raw, hasFrontmatter: false };

  const frontmatter = {};
  match[1].split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key || !value) return;
    frontmatter[key] = value;
  });

  return {
    frontmatter,
    body: raw.slice(match[0].length),
    hasFrontmatter: true,
  };
};

const buildFrontmatter = (frontmatter) => {
  const preferredOrder = ["title", "date", "summary", "slug", "tags", "keywords"];
  const orderedKeys = [
    ...preferredOrder.filter((key) => frontmatter[key]),
    ...Object.keys(frontmatter).filter(
      (key) => !preferredOrder.includes(key) && frontmatter[key],
    ),
  ];

  if (orderedKeys.length === 0) return "";

  const lines = orderedKeys.map((key) => `${key}: ${frontmatter[key]}`);
  return `---\n${lines.join("\n")}\n---\n\n`;
};

const listBlogFiles = () =>
  fs
    .readdirSync(blogDir)
    .filter((name) => name.endsWith(".md"))
    .filter((name) => !name.startsWith("_"));

const readBlogMeta = (fileName) => {
  const filePath = path.join(blogDir, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter } = parseFrontmatter(raw);

  const fallbackTitle = fileName
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-?/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const title = frontmatter.title || fallbackTitle;
  const slug = frontmatter.slug || toSlug(title);
  const date = frontmatter.date || fileName.slice(0, 10);
  const tags = (frontmatter.tags || "")
    .split(",")
    .map((tag) => normalizeTag(tag))
    .filter(Boolean);

  return { fileName, filePath, title, slug, date, tags, frontmatter, raw };
};

const ensureTagExists = (tag) => {
  const taxonomy = readJson(taxonomyPath).map((item) => normalizeTag(item));
  if (!taxonomy.includes(tag)) {
    console.error(`Tag '${tag}' is not in taxonomy. Add it first with tags add.`);
    process.exit(1);
  }
};

const validateTag = (tag) => {
  const normalized = normalizeTag(tag);

  if (!normalized) {
    console.error("Tag cannot be empty.");
    process.exit(1);
  }

  if (normalized.length > 50) {
    console.error("Tag must be 50 characters or less.");
    process.exit(1);
  }

  if (!/^[a-z0-9-]+$/.test(normalized)) {
    console.error("Tag can only contain lowercase letters, numbers, and hyphens.");
    process.exit(1);
  }

  return normalized;
};

const isValidUrl = (url) => {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateProject = (project, existingIds = new Set()) => {
  const errors = [];

  if (!project.id || !String(project.id).trim()) {
    errors.push("Project id is required.");
  } else if (!/^[a-z0-9-]+$/.test(project.id)) {
    errors.push("Project id can only contain lowercase letters, numbers, and hyphens.");
  } else if (existingIds.has(project.id)) {
    errors.push(`Project id '${project.id}' already exists.`);
  }

  if (!project.title || !String(project.title).trim()) {
    errors.push("Project title is required.");
  } else if (String(project.title).length > 100) {
    errors.push("Project title must be 100 characters or less.");
  }

  if (!project.description || !String(project.description).trim()) {
    errors.push("Project description is required.");
  } else if (String(project.description).length > 500) {
    errors.push("Project description must be 500 characters or less.");
  }

  if (project.code && !isValidUrl(project.code)) {
    errors.push(`Project source URL is invalid: ${project.code}`);
  }

  if (project.demo && !isValidUrl(project.demo)) {
    errors.push(`Project demo URL is invalid: ${project.demo}`);
  }

  if (errors.length > 0) {
    console.error("Validation failed:");
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }
};

const handleTags = (args) => {
  const action = args[0];
  const taxonomy = readJson(taxonomyPath).map((tag) => normalizeTag(tag));

  if (action === "list") {
    taxonomy.forEach((tag) => console.log(`- ${tag}`));
    return;
  }

  if (action === "add") {
    const rawTag = args[1] || "";
    const tag = validateTag(rawTag);

    if (taxonomy.includes(tag)) {
      console.log(`Tag already exists: ${tag}`);
      return;
    }

    const next = [...taxonomy, tag].sort();
    writeJson(taxonomyPath, next);
    console.log(`Added tag: ${tag}`);
    return;
  }

  if (action === "remove") {
    const tag = normalizeTag(args[1] || "");
    if (!tag) {
      console.error("Provide a tag: tags remove <tag>");
      process.exit(1);
    }

    if (!taxonomy.includes(tag)) {
      console.log(`Tag not found: ${tag}`);
      return;
    }

    const next = taxonomy.filter((item) => item !== tag);
    writeJson(taxonomyPath, next);

    listBlogFiles().forEach((fileName) => {
      const meta = readBlogMeta(fileName);
      const nextTags = meta.tags.filter((item) => item !== tag);

      if (nextTags.length === meta.tags.length) return;

      meta.frontmatter.tags = nextTags.join(", ");
      if (!meta.frontmatter.tags) delete meta.frontmatter.tags;
      const nextRaw = `${buildFrontmatter(meta.frontmatter)}${parseFrontmatter(meta.raw).body}`;
      fs.writeFileSync(meta.filePath, nextRaw, "utf8");
    });

    console.log(`Removed tag: ${tag}`);
    console.log("Removed this tag from blog posts where it was present.");
    return;
  }

  console.error("Unknown tags command.");
  console.log(usage);
  process.exit(1);
};

const handleBlogs = (args) => {
  const action = args[0];

  if (action === "list") {
    const posts = listBlogFiles().map(readBlogMeta);
    posts
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((post) => {
        const tags = post.tags.length ? post.tags.join(", ") : "none";
        console.log(`${post.slug} | ${post.date} | ${post.title} | tags: ${tags}`);
      });
    return;
  }

  if (action === "add-tag" || action === "remove-tag") {
    const slug = (args[1] || "").trim();
    const tag = normalizeTag(args[2] || "");

    if (!slug || !tag) {
      console.error(`Usage: blogs ${action} <slug> <tag>`);
      process.exit(1);
    }

    ensureTagExists(tag);

    const post = listBlogFiles()
      .map(readBlogMeta)
      .find((item) => item.slug === slug);

    if (!post) {
      console.error(`Blog slug not found: ${slug}`);
      process.exit(1);
    }

    const tags = new Set(post.tags);

    if (action === "add-tag") tags.add(tag);
    if (action === "remove-tag") tags.delete(tag);

    post.frontmatter.tags = Array.from(tags).sort().join(", ");
    if (!post.frontmatter.tags) delete post.frontmatter.tags;

    const body = parseFrontmatter(post.raw).body;
    const nextRaw = `${buildFrontmatter(post.frontmatter)}${body}`;
    fs.writeFileSync(post.filePath, nextRaw, "utf8");

    console.log(
      `${action === "add-tag" ? "Added" : "Removed"} tag '${tag}' ${
        action === "add-tag" ? "to" : "from"
      } blog '${slug}'.`,
    );
    return;
  }

  console.error("Unknown blogs command.");
  console.log(usage);
  process.exit(1);
};

const handleProjects = (args) => {
  const action = args[0];
  const projects = readJson(projectsPath);

  if (action === "list") {
    projects.forEach((project, index) => {
      console.log(
        `${index + 1}. ${project.id} | ${project.title} | source: ${project.code || "-"} | demo: ${project.demo || "-"}`,
      );
    });
    return;
  }

  if (action === "add") {
    const flags = parseFlags(args.slice(1));
    const title = (flags.name || "").trim();
    const description = (flags.description || "").trim();

    if (!title || !description) {
      console.error(
        'Usage: projects add --name "Name" --description "Desc" [--source "url"] [--demo "url"] [--image "path"]',
      );
      process.exit(1);
    }

    const baseId = toSlug(title);
    let id = baseId;
    let counter = 2;

    const existingIds = new Set(projects.map((p) => p.id));
    while (existingIds.has(id)) {
      id = `${baseId}-${counter}`;
      counter += 1;
    }

    const nextProject = {
      id,
      title,
      description,
      ...(flags.source ? { code: String(flags.source) } : {}),
      ...(flags.demo ? { demo: String(flags.demo) } : {}),
      ...(flags.image ? { image: String(flags.image) } : {}),
    };

    validateProject(nextProject, existingIds);
    projects.push(nextProject);
    writeJson(projectsPath, projects);
    console.log(`Added project: ${id}`);
    return;
  }

  if (action === "update") {
    const flags = parseFlags(args.slice(1));
    const id = (flags.id || "").trim();

    if (!id) {
      console.error(
        'Usage: projects update --id "project-id" [--name "New"] [--description "New"] [--source "url"] [--demo "url"] [--image "path"]',
      );
      process.exit(1);
    }

    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) {
      console.error(`Project id not found: ${id}`);
      process.exit(1);
    }

    const current = projects[index];

    if (flags.name) current.title = String(flags.name).trim();
    if (flags.description) current.description = String(flags.description).trim();
    if (flags.source) current.code = String(flags.source).trim();
    if (flags.demo) current.demo = String(flags.demo).trim();
    if (flags.image) current.image = String(flags.image).trim();

    if (flags.source === "") delete current.code;
    if (flags.demo === "") delete current.demo;
    if (flags.image === "") delete current.image;

    const existingIds = new Set(projects.map((p) => p.id).filter((pid) => pid !== id));
    validateProject(current, existingIds);

    writeJson(projectsPath, projects);
    console.log(`Updated project: ${id}`);
    return;
  }

  if (action === "remove") {
    const flags = parseFlags(args.slice(1));
    const id = (flags.id || "").trim();

    if (!id) {
      console.error('Usage: projects remove --id "project-id"');
      process.exit(1);
    }

    const next = projects.filter((project) => project.id !== id);

    if (next.length === projects.length) {
      console.error(`Project id not found: ${id}`);
      process.exit(1);
    }

    writeJson(projectsPath, next);
    console.log(`Removed project: ${id}`);
    return;
  }

  console.error("Unknown projects command.");
  console.log(usage);
  process.exit(1);
};

const [domain, ...args] = process.argv.slice(2);

if (!domain) {
  console.log(usage);
  process.exit(0);
}

if (domain === "tags") {
  handleTags(args);
  process.exit(0);
}

if (domain === "blogs") {
  handleBlogs(args);
  process.exit(0);
}

if (domain === "projects") {
  handleProjects(args);
  process.exit(0);
}

console.error("Unknown command domain.");
console.log(usage);
process.exit(1);
