import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Mail, Github, Twitter, Linkedin, Plus, ChevronDown, ExternalLink, Code2, Database, Layout, Terminal } from 'lucide-react';

/**
 * --- DATA & CONFIGURATION ---
 */

const DATA = {
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

/**
 * --- UTILS ---
 */

const smoothEase = [0.22, 1, 0.36, 1]; // Custom cubic bezier for "premium" feel

/**
 * --- COMPONENTS ---
 */

// 1. Preloader Component (NEW)
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000; // 2 seconds load time
        const intervalTime = 20;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
            setCount(progress);

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 500); // Slight delay at 100% before lifting
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-6 md:p-12 text-neutral-200"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Top Bar */}
            <div className="flex justify-between items-start opacity-50">
                <span className="font-mono text-xs uppercase tracking-widest">San Francisco, CA</span>
                <span className="font-mono text-xs uppercase tracking-widest">Portfolio '26</span>
            </div>

            {/* Center Big Counter */}
            <div className="flex justify-center items-center">
                <div className="relative">
                    <motion.span
                        className="text-[15vw] md:text-[20vw] font-bold leading-none tracking-tighter tabular-nums"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {count}
                    </motion.span>
                    <span className="absolute top-4 md:top-12 -right-4 md:-right-12 text-xl md:text-4xl font-light text-red-600">%</span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 animate-pulse rounded-full" />
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">System Initializing...</span>
                </div>
                <div className="w-24 h-[1px] bg-neutral-800 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-red-600"
                        initial={{ x: "-100%" }}
                        animate={{ x: `${count - 100}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};


// 2. UI Primitives
const Separator = () => (
    <div className="w-full h-[1px] bg-neutral-800 my-8 opacity-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-full bg-neutral-700 animate-slide-right opacity-0" />
    </div>
);

const Cross = ({ className = "" }: { className?: string }) => (
    <Plus strokeWidth={1} className={`text-red-600 ${className}`} size={14} />
);

const StickyTag = () => {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 mix-blend-difference pointer-events-none">
            <div className="h-24 w-[1px] bg-white/30" />
            <span className="text-[10px] tracking-widest uppercase [writing-mode:vertical-rl] text-white/80 font-mono">
                System 2.0
            </span>
            <div className="h-24 w-[1px] bg-white/30" />
        </div>
    );
};

// 3. Navigation
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md' : 'py-8 bg-transparent'}`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-black font-bold text-xs overflow-hidden relative">
                        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">JK</span>
                        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white">404</span>
                    </div>
                    <span className="hidden md:block font-medium tracking-tight text-sm text-neutral-300">
                        Jackson Kasi
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex gap-6 text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {['Work', 'About', 'Notes', 'Contact'].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`} className="hover:text-red-500 transition-colors relative group">
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="bg-neutral-100 text-black px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors duration-300">
                        Let's Talk
                    </button>
                </div>
            </div>
        </nav>
    );
};

// 4. Hero Section
const Hero = ({ isLoaded }: { isLoaded: boolean }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
            {/* Background Abstract Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="z-10 w-full max-w-[90vw] mx-auto">
                <motion.div style={{ opacity, scale }} className="relative">
                    <motion.h1
                        className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase text-neutral-100 mix-blend-screen"
                        initial={{ y: 100, opacity: 0 }}
                        animate={isLoaded ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                        transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
                    >
                        Engineering
                    </motion.h1>

                    <motion.div
                        className="flex flex-col md:flex-row md:items-start justify-between w-full mt-4 md:-mt-4 lg:-mt-12 pl-2 md:pl-4"
                        initial={{ y: 100, opacity: 0 }}
                        animate={isLoaded ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: smoothEase }}
                    >
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <Cross />
                            <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-xs leading-relaxed uppercase tracking-wide">
                                Architecting performant interfaces<br />
                                for the modern web.
                            </p>
                        </div>

                        <motion.h1
                            style={{ x: y2 }} // subtle parallax
                            className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase text-neutral-800 text-right md:text-left hover:text-red-600 transition-colors duration-500 cursor-default"
                        >
                            Interactions
                        </motion.h1>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="w-2 h-2 bg-red-600 animate-pulse" />
                <span className="font-mono text-xs text-neutral-500 uppercase">
                    Based in San Francisco / Available for Q1
                </span>
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 right-6 md:right-12 animate-bounce-slow hidden md:block"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
            >
                <ChevronDown className="text-neutral-600" />
            </motion.div>
        </section>
    );
};

// 5. Project Card Component
const ProjectItem = ({ project, index }: { project: typeof DATA.projects[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative border-t border-neutral-900 py-16 transition-colors hover:bg-neutral-900/30"
        >
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-8">

                {/* Left: ID & Title */}
                <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-xs text-red-600">0{index + 1}</span>
                        <span className="h-[1px] w-8 bg-red-900/50" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-neutral-200 group-hover:translate-x-4 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                        {project.title}
                    </h3>
                </div>

                {/* Middle: Description */}
                <div className="md:w-1/3">
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono uppercase border border-neutral-800 px-2 py-1 text-neutral-500 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Action */}
                <div className="md:w-1/3 flex justify-end items-center">
                    <a href={project.link} className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:scale-110 transition-all duration-300">
                        <ArrowUpRight className="text-neutral-400 group-hover:text-black transition-colors" size={24} />
                    </a>
                </div>
            </div>

            {/* Background Hover Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-900/0 via-neutral-900/0 to-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

// 6. About / Skills Section
const AboutSection = () => {
    return (
        <section id="about" className="py-32 bg-neutral-950 relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row gap-16">

                    <div className="md:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-sm font-mono uppercase text-red-600 mb-4 tracking-widest flex items-center gap-2">
                                <Cross />
                                About
                            </h2>
                            <h3 className="text-4xl font-bold text-white mb-6">
                                Cost-conscious engineering backed by systematic design.
                            </h3>
                            <p className="text-neutral-400 leading-relaxed mb-8">
                                I bridge the gap between Figma and VS Code. My philosophy is simple: clean code performs better, and accessible UI converts better. I specialize in building privacy-aware, high-performance applications that feel native.
                            </p>

                            <div className="p-6 border border-neutral-900 bg-neutral-900/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                                        <Terminal size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Full-Stack Capable</div>
                                        <div className="text-neutral-500 text-xs">DB to DOM</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                                        <Layout size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Design Literate</div>
                                        <div className="text-neutral-500 text-xs">Pixel Perfection</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {DATA.skills.map((skillGroup, idx) => (
                                <div key={idx} className="border border-neutral-900 p-8 hover:border-red-900/50 transition-colors duration-300">
                                    <h4 className="text-lg font-bold text-white mb-6 border-b border-neutral-900 pb-2">{skillGroup.category}</h4>
                                    <ul className="space-y-3">
                                        {skillGroup.items.map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
                                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-50" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Simulated Case Study Teaser */}
                        <div className="mt-16 relative group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                            <div className="relative z-10 border border-neutral-800 p-8 md:p-12">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-red-500 mb-2">Latest Deep Dive</h4>
                                        <h3 className="text-2xl font-bold text-white mb-2">Refactoring Legacy Monoliths</h3>
                                        <p className="text-neutral-500 text-sm">How we reduced build times by 60% using Turborepo and cached artifacts.</p>
                                    </div>
                                    <ArrowUpRight className="text-neutral-700 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 7. Contact Section
const Contact = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        // navigator.clipboard.writeText is guarded in iframe, using execCommand as fallback
        const textArea = document.createElement("textarea");
        textArea.value = DATA.email;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <section id="contact" className="min-h-[80vh] flex flex-col justify-between py-20 px-6 md:px-12 bg-neutral-950 border-t border-neutral-900">
            <div>
                <h2 className="text-[10vw] font-bold text-white leading-none tracking-tighter mb-8">
                    LET'S BUILD <br />
                    <span className="text-neutral-800 hover:text-red-600 transition-colors duration-500">TOGETHER</span>
                </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="w-full md:w-auto">
                    <p className="text-neutral-400 mb-6 font-mono text-sm uppercase">Drop me a line</p>
                    <button
                        onClick={copyEmail}
                        className="group flex items-center gap-4 text-2xl md:text-3xl font-light text-white hover:text-red-500 transition-colors"
                    >
                        {DATA.email}
                        <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                            {copied ? <Code2 size={20} className="text-white" /> : <Copy size={20} className="text-neutral-400 group-hover:text-black" />}
                        </div>
                    </button>
                    {copied && <p className="text-red-500 text-xs font-mono mt-2 animate-fade-in">Copied to clipboard!</p>}
                </div>

                <div className="flex gap-6">
                    {DATA.socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            className="text-neutral-500 hover:text-white transition-colors text-sm uppercase font-mono tracking-wider flex items-center gap-2 group"
                        >
                            <social.icon size={16} />
                            <span className="group-hover:translate-x-1 transition-transform">{social.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-24 pt-8 border-t border-neutral-900 flex justify-between items-center text-xs text-neutral-600 font-mono uppercase">
                <span>© {new Date().getFullYear()} Jackson Kasi</span>
                <span className="hidden md:inline">Designed in Figma, Built with Next.js</span>
                <span>Local time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </section>
    );
};

// 8. Custom Cursor (Optional visual flair - usually handled by CSS for performance, but simple follower here)
// Keeping it ultra-simple for performance: we will just use CSS for interactions.

/**
 * --- MAIN APP ---
 */

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="bg-[#050505] min-h-screen text-neutral-200 selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
            {/* Global CSS for custom fonts/utils */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        :root {
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }
        
        body {
          font-family: var(--font-sans);
        }

        .font-mono {
          font-family: var(--font-mono);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}</style>
            <AnimatePresence mode='wait'>
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            <Navbar />
            <StickyTag />
            <main>
                <Hero isLoaded={!loading} />
                <section id="work" className="py-20">
                    <div className="container mx-auto px-6 md:px-12 mb-16 flex items-end justify-between">
                        <h2 className="text-sm font-mono uppercase text-neutral-500 tracking-widest flex items-center gap-2">
                            <Cross />
                            Selected Work (2023-2025)
                        </h2>
                        <span className="text-xs font-mono text-neutral-700 hidden md:block">SCROLL TO EXPLORE</span>
                    </div>
                    <div className="flex flex-col">
                        {DATA.projects.map((project, index) => (
                            <ProjectItem key={project.id} project={project} index={index} />
                        ))}
                    </div>
                    <div className="container mx-auto px-6 md:px-12 mt-16 text-center">
                        <button className="text-sm font-mono uppercase text-neutral-500 hover:text-white border-b border-transparent hover:border-red-600 transition-all pb-1">
                            View All Archives
                        </button>
                    </div>
                </section>
                <AboutSection />
                {/* Writing/Notes Section Teaser */}
                <section className="py-20 border-t border-neutral-900 bg-neutral-950">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-2 mb-12">
                            <Cross />
                            <h2 className="text-sm font-mono uppercase text-neutral-500 tracking-widest">Engineering Notes</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-[4/3] bg-neutral-900 mb-4 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-neutral-800 transform scale-105 group-hover:scale-100 transition-transform duration-700" />
                                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-2 py-1 text-xs font-mono text-white">
                                            NOTE 00{i}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-300 group-hover:text-red-500 transition-colors">
                                        The State of React Server Components in 2026
                                    </h3>
                                    <p className="text-sm text-neutral-600 mt-2">March 12, 2025</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Contact />
            </main>
        </div>
    );
};

export default App;
