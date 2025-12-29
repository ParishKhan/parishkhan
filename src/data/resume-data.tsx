import { Github, Linkedin, Mail, Twitter, Facebook, Phone, ExternalLink } from "lucide-react";
export const RESUME_DATA = {
  name: "Parish Khan",
  formalName: "Mezbibur Rahman Khan",
  initials: "PK",
  location: "Bogura, Bangladesh",
  locationLink: "https://www.google.com/maps/place/Bogura",
  about:
    "Software Engineer focused on building high-performance web applications with a minimalist aesthetic and clean code architecture.",
  summary:
    "I am a results-driven Full Stack Engineer with a passion for frontend excellence and robust testing strategies. Currently scaling creative platforms at Artlist LTD.",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
  contact: {
    email: "parish@artlist.io",
    phone: "+880 1737094776",
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
        name: "Facebook",
        url: "https://www.facebook.com/mezbibur/",
        icon: Facebook,
      },
      {
        name: "Twitter",
        url: "https://twitter.com/parish",
        icon: Twitter,
      },
    ],
  },
  skills: {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Angular", "NextUI", "Material UI", "Styled Components", "GraphQL"],
    testing: ["Jest", "Storybook", "Unit Test", "Automation"],
    tools: ["Clean Code", "Git", "Accessibility", "JIRA", "TDD", "CI/CD"],
    ai: ["Prompt Engineering", "Vibe Coding", "LLMs", "AI Tools"],
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
      techStack: ["Angular 7", "TypeScript", "RxJS", "Sass", "Material UI"],
      description: "A web app to buy licensed video. Cypress for unit test and REST for data fetching. Focused on performance and reliability.",
      link: {
        label: "artgrid.io",
        href: "https://artgrid.io",
      },
    },
    {
      title: "TutorialSearch",
      techStack: ["React", "TypeScript", "NextJS"],
      description: "Tutorial search platform for developers.",
      link: {
        label: "tutorialsearch.io",
        href: "https://tutorialsearch.io/",
      },
    },
  ],
} as const;