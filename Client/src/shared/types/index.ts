export type Theme = "dark" | "light";

export interface ThemeState {
  mode: Theme;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  points: string[];
  icon: string;
  color: string;
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string;
  color: string;
}
