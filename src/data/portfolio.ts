import { Github, Twitter, Linkedin } from 'lucide-react';

export const DATA = {
    name: "Jackson Kasi",
    role: "Creative Technologist",
    location: "San Francisco, CA",
    email: "hello@jacksonkasi.dev",
    socials: [
        { label: "GitHub", href: "#", icon: Github },
        { label: "Twitter", href: "#", icon: Twitter },
        { label: "LinkedIn", href: "#", icon: Linkedin },
    ],
    projects: [
        {
            id: "tiger-sql",
            title: "Tiger SQL",
            category: "System Tooling",
            description: "PostgreSQL schema visualizer with AI-assisted optimizations.",
            tags: ["Next.js", "Postgres", "Drizzle", "AI/MCP"],
            year: "2025",
            link: "#"
        },
        {
            id: "content-magic",
            title: "Content Magic",
            category: "Figma Plugin",
            description: "Generative design workflow automation for high-velocity teams.",
            tags: ["React", "Figma API", "OpenAI", "WebSockets"],
            year: "2024",
            link: "#"
        },
        {
            id: "figma-cloner",
            title: "Site-to-Figma",
            category: "DevOps / Design",
            description: "Pixel-perfect DOM scraping and recreation engine.",
            tags: ["Puppeteer", "Node.js", "Canvas API"],
            year: "2024",
            link: "#"
        },
        {
            id: "codepulse",
            title: "CodePulse",
            category: "Mobile Intelligence",
            description: "Real-time performance telemetry dashboards for iOS/Android.",
            tags: ["React Native", "TurboModules", "Go"],
            year: "2023",
            link: "#"
        }
    ],
    skills: [
        { category: "Core", items: ["TypeScript", "Next.js", "React", "Node.js"] },
        { category: "Style", items: ["Tailwind", "CSS Modules", "Framer Motion", "Shadcn/UI"] },
        { category: "Backend", items: ["PostgreSQL", "Drizzle ORM", "Redis", "Cloudflare Workers"] },
        { category: "Infra", items: ["AWS", "Docker", "Terraform", "CI/CD"] }
    ]
};
