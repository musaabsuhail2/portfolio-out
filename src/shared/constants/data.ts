import type { Project, Skill, Certification } from "@/shared/types";

export const projects: Project[] = [
  {
    id: "callcenter",
    title: "AI & Human Agent Call Center",
    description:
      "Real-time call center platform bridging AI automation with live human agent support at scale.",
    tags: ["React", "LiveKit", "WebSockets", "Redux"],
    points: [
      "Developed full agent-side frontend interface",
      "Integrated LiveKit SDK for real-time room connections",
      "WebSocket architecture for live call state management",
    ],
    icon: "📞",
    color: "#00d4ff",
  },
  {
    id: "eventmgmt",
    title: "Event & Talent Factory Portal",
    description:
      "Feature-rich admin portal for managing events, talent profiles, and role-based access control.",
    tags: ["React", "Redux", "Keycloak", "REST API"],
    points: [
      "Built admin dashboards and reusable data modules",
      "Implemented Keycloak RBAC for secure access",
      "Reusable form, table, and data view components",
    ],
    icon: "🎭",
    color: "#a78bfa",
  },
  {
    id: "attendance",
    title: "Attendance Management System",
    description:
      "Responsive attendance tracking frontend with clean UX for employee management workflows.",
    tags: ["React", "CSS", "REST API"],
    points: [
      "Designed fully responsive screen layouts",
      "Focused on clean, user-friendly experience",
      "Optimised for both mobile and desktop use",
    ],
    icon: "📅",
    color: "#34d399",
  },
];

export const skills: Skill[] = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "JavaScript ES6+", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 78, category: "Frontend" },
  { name: "HTML & CSS", level: 95, category: "Frontend" },
  { name: "Redux Toolkit", level: 85, category: "State" },
  { name: "TanStack Query", level: 80, category: "State" },
  { name: "Keycloak", level: 75, category: "Auth & Realtime" },
  { name: "WebSockets", level: 72, category: "Auth & Realtime" },
  { name: "LiveKit", level: 68, category: "Auth & Realtime" },
  { name: "Mapbox", level: 70, category: "Integrations" },
  { name: "REST APIs", level: 88, category: "Integrations" },
  { name: "Git", level: 85, category: "Tools" },
];

export const certifications: Certification[] = [
  {
    name: "Data Analytics and Visualization",
    issuer: "Accenture",
    icon: "📊",
    color: "#60a5fa",
  },
  {
    name: "GenAI for Multilingual India",
    issuer: "Ailaysa",
    icon: "🤖",
    color: "#a78bfa",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    icon: "⚡",
    color: "#00d4ff",
  },
  {
    name: "MERN Stack",
    issuer: "PrepInsta Prime",
    icon: "🔥",
    color: "#34d399",
  },
];
