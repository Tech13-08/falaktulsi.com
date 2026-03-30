# falaktulsi.com

Personal portfolio website built with React, TypeScript, Tailwind CSS, and Vite.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file and add EmailJS values:

```bash
cp .env.example .env
```

## Scripts

- Start dev server:

```bash
npm run dev
```

- Build production bundle:

```bash
npm run build
```

- Preview production build locally:

```bash
npm run preview
```

- Run tests:

```bash
npm test
```

- Create a new blog post from the technical journey template:

```bash
npm run new-post -- "Installing Two Hardwired Dash Cams"
```

## Blog Workflow

1. Generate a new post file:

```bash
npm run new-post -- "Your Post Title"
```

2. Edit the generated markdown file in src/content/blog/.

3. Add your content and keep or update frontmatter fields:
- title
- date
- summary
- slug
- keywords
- tags

4. Posts auto-appear on /blog and individual post pages.

## Content Maintenance Commands

All maintenance operations are file-backed (no database) and run through scripts/content-admin.mjs.

List tags:

```bash
npm run tags:list
```

Add/remove a tag:

```bash
npm run tags:add -- coffee
npm run tags:remove -- coffee
```

List blogs and edit blog tags by slug:

```bash
npm run blogs:list
npm run blogs:add-tag -- your-post-slug hardware
npm run blogs:remove-tag -- your-post-slug hardware
```

List/add/update/remove projects:

```bash
npm run projects:list
npm run projects:add -- --name "My Project" --description "What it does" --source "https://github.com/me/repo" --demo "https://demo.example" --image "project.png"
npm run projects:update -- --id "my-project" --name "My Project V2"
npm run projects:remove -- --id "my-project"
```

Power command (direct access to all subcommands):

```bash
npm run content-admin -- tags list
npm run content-admin -- blogs list
npm run content-admin -- projects list
```
