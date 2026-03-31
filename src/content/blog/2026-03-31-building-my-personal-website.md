---
title: Building My Personal Website
date: 2026-03-31
summary: An overview of how I built my personal website using React, TypeScript, and Tailwind CSS.
slug: building-my-personal-website
tags: software
keywords: react,typescript,tailwind,vite,portfolio,website,development,webdev
---

# Building My Personal Website

This post outlines the journey of creating this website. It's a project that I'm proud of because of the process, technologies, and creative decisions throughout it.

## The Stack

I chose a modern and efficient stack for this project:

*   **React:** For building the user interface with its component-based architecture
*   **TypeScript:** To bring static typing to JavaScript
*   **Tailwind CSS:** A utility-first CSS framework that allowed me to build a custom design without writing a lot of custom CSS
*   **Vite:** As the build tool and development server
*   **EmailJS:** To handle the contact form submissions without needing a backend server

## The Journey

The development process was iterative. I started with a basic structure and then gradually added features and refined the design.

### Initial Setup

I began by scaffolding a new React project with Vite and TypeScript. This gave me a solid foundation on which I then integrated Tailwind CSS.

### Content Management

One of the interesting challenges was how to manage the content of the website (blog posts, projects, etc.) without a traditional CMS. I opted for storing the content in JSON files and Markdown. I created a Node.js script (`scripts/content-admin.mjs`) to manage this content from the command line, which made adding and updating content much easier.

### Component-Based Design

I designed the website with a component-based approach. This made the code more modular, reusable, and easier to maintain. Some of the key components include:

*   `ProjectCard.tsx`: A reusable card to display my projects
*   `EducationTimeline.tsx`: A timeline to showcase my educational background
*   `FavoriteBadges.tsx`: A fun component to display some of my favorite things
*   `Device.tsx`: A component that simulates a device screen to display my tech stack

### Theming

I wanted the ability to switch between different color themes. I achieved this by using CSS variables and a simple theme switcher component. The `colorPalettes.ts` file defines the different themes, and the `applyThemeColors.ts` script applies the selected theme to the website.

### Deployment

For deployment, I chose a static hosting provider. The `npm run build` command generates a `dist` directory with all the static assets, which can then be deployed to any static hosting service.

## Conclusion

Building this website has been a great learning experience. It allowed me to work with some of my favorite technologies and create a platform to showcase my work and share my thoughts. I'm looking forward to adding more features and content in the future.
