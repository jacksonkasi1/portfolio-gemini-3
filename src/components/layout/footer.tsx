// ** import types
import { useRef, useEffect } from 'react';

// ** import core packages
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Parallax effect for the main container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

    // Text Fill Animation
    const fillProgress = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

    useEffect(() => {
        const textElement = textRef.current;
        if (!textElement) return;

        // Split text animation logic would go here if we want character-by-character reveal
        // For now, using a clean reveal

        gsap.fromTo(textElement,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

    }, []);

    const socialLinks = [
        { name: "LinkedIn", href: "https://linkedin.com/in/jacksonkasi" },
        { name: "Twitter", href: "https://twitter.com/jacksonkasi_" },
        { name: "GitHub", href: "https://github.com/jacksonkasi1" },
        { name: "Instagram", href: "#" }
    ];

    return (
        <footer id="contact" ref={containerRef} className="relative bg-black text-white min-h-screen flex flex-col justify-between px-6 md:px-24 py-32 md:py-48 overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gradient-to-b from-neutral-800 to-black blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
                <motion.div style={{ y }} className="space-y-12">
                    <div className="overflow-hidden py-4">
                        <motion.h2
                            ref={textRef}
                            className="text-[12vw] leading-[0.9] font-black tracking-tighter uppercase"
                            style={{
                                WebkitTextStroke: '1px white',
                                color: 'transparent',
                                backgroundImage: 'linear-gradient(to top, white 50%, transparent 50%)',
                                backgroundSize: '100% 200%',
                                backgroundPositionX: '0%',
                                backgroundPositionY: fillProgress,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text'
                            }}
                        >
                            Let's Talk
                        </motion.h2>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <a href="mailto:hello@jacksonkasi.dev" className="group relative">
                            <span className="text-4xl md:text-6xl font-light tracking-tight hover:text-neutral-400 transition-colors duration-300">
                                hello@jacksonkasi.dev
                            </span>
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full" />
                        </a>

                        <div className="max-w-md">
                            <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                                Creating digital experiences that bridge the gap between human intuition and technical precision.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 pt-24 border-t border-neutral-900 mt-12 flex flex-col md:flex-row justify-between items-end gap-8">

                <div className="flex flex-col gap-4">
                    <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">Socials</span>
                    <div className="flex gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-lg hover:text-neutral-400 transition-colors"
                            >
                                <span className="relative overflow-hidden inline-block">
                                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                                    <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-neutral-500">
                                        {link.name}
                                    </span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 text-neutral-600">
                    <span className="text-sm uppercase tracking-wider">Antigravity © 2026</span>
                    <span className="text-xs">All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
};
