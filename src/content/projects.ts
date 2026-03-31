import projectsData from "./projects.json";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  code?: string;
  demo?: string;
  image?: string;
}

// The JSON data is being imported with an extra nesting level.
// We need to flatten it to get the array of projects.
export const projects: ProjectItem[] = (projectsData as any).flat() as ProjectItem[];

