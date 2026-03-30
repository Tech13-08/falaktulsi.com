import projectsData from "./projects.json";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  code?: string;
  demo?: string;
  image?: string;
}

export const projects: ProjectItem[] = projectsData as ProjectItem[];

