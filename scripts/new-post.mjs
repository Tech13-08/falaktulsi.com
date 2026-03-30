import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new-post -- "Your Post Title"');
  process.exit(1);
}

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const today = new Date().toISOString().slice(0, 10);
const slug = toSlug(title);

if (!slug) {
  console.error("Unable to generate a valid slug from the provided title.");
  process.exit(1);
}

const rootDir = process.cwd();
const blogDir = path.join(rootDir, "src", "content", "blog");
const templatePath = path.join(blogDir, "_template-technical-journey.md");
const fileName = `${today}-${slug}.md`;
const targetPath = path.join(blogDir, fileName);

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}

if (fs.existsSync(targetPath)) {
  console.error(`Post already exists: ${targetPath}`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const summary = "One-line summary of the project, challenges, and outcome.";
const tags = "software, learning";
const keywords = "dash cam hardwire install, technical journey, troubleshooting";

const content = template
  .replaceAll("__TITLE__", title)
  .replaceAll("__DATE__", today)
  .replaceAll("__SUMMARY__", summary)
  .replaceAll("__SLUG__", slug)
  .replaceAll("__TAGS__", tags)
  .replaceAll("__KEYWORDS__", keywords);

fs.writeFileSync(targetPath, content, "utf8");

console.log(`Created: ${path.relative(rootDir, targetPath)}`);
