import { Github, Linkedin, Mail, Twitter, Globe, ExternalLink } from "lucide-react";
export const RESUME_DATA = {
  name: "Mezbibur 'Parish' Rahman",
  initials: "PR",
  location: "Israel, Artlist LTD",
  locationLink: "https://www.google.com/maps/place/Israel",
  about:
    "Software Engineer focused on building high-performance web applications with a minimalist aesthetic and clean code architecture.",
  summary:
    "I am a results-driven Full Stack Engineer with a passion for frontend excellence and robust testing strategies. Currently scaling creative platforms at Artlist LTD. I thrive in environments that value technical rigour, agile methodologies, and elegant user interfaces.",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
  contact: {
    email: "parish@example.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/parish",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/parish",
        icon: Linkedin,
      },
      {
        name: "Twitter",
        url: "https://twitter.com/parish",
        icon: Twitter,
      },
    ],
  },
  skills: {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
    testing: ["Jest", "React Testing Library", "Cypress", "Playwright"],
    tools: ["Git", "Docker", "Agile/Scrum", "CI/CD", "Vite"],
  },
  work: [
    {
      company: "Artlist LTD",
      link: "https://artlist.io",
      badges: ["Remote", "Full-time"],
      title: "Software Engineer",
      logo: "AL",
      start: "2021",
      end: "Present",
      description:
        "Leading frontend initiatives for Artlist and Artgrid. Implementing design systems, optimizing performance, and ensuring 90%+ test coverage across core micro-frontends.",
    },
    {
      company: "Freelance",
      link: "#",
      badges: ["Self-employed"],
      title: "Full Stack Developer",
      logo: "FL",
      start: "2019",
      end: "2021",
      description:
        "Developed custom e-commerce solutions and billing systems (E-Bill) for various clients using React and Node.js.",
    },
  ],
  projects: [
    {
      title: "Artlist.io",
      techStack: ["React", "TypeScript", "Next.js", "Styled Components"],
      description: "A creative licensing platform for high-quality music, SFX, and footage.",
      link: {
        label: "artlist.io",
        href: "https://artlist.io",
      },
    },
    {
      title: "Artgrid",
      techStack: ["React", "Redux", "Node.js"],
      description: "Stock footage platform with advanced search and discovery features.",
      link: {
        label: "artgrid.io",
        href: "https://artgrid.io",
      },
    },
    {
      title: "E-Bill System",
      techStack: ["React", "Express", "PostgreSQL"],
      description: "Minimalist invoicing and billing automation for small businesses.",
      link: {
        label: "github.com/ebill",
        href: "#",
      },
    },
  ],
} as const;