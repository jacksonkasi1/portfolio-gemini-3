// ** import core
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// ** import ui
import { VelocityText } from '@/components/ui/velocity-text';

export const Hero = () => {
    const { scrollY } = useScroll();

    // Parallax & Opacity for Scroll-out
    const yHero = useTransform(scrollY, [0, 800], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);
    const scaleHero = useTransform(scrollY, [0, 1000], [1, 0.95]);

    // Time display
    const [time, setTime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="index" className="relative h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12 text-[#EAEAEA] bg-black z-10">

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            <motion.div
                style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
                className="relative w-full h-full flex flex-col justify-between"
            >
                {/* TOP HEADER REMOVED FOR CLEAN LAYOUT */}
                <div />

                {/* MAIN TITLE BLOCK */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <div className="overflow-hidden">
                        <VelocityText skewIntensity={2} className="font-display text-[15vw] leading-none tracking-tight text-white">
                            BEYOND
                        </VelocityText>
                    </div>

                    <div className="overflow-hidden flex items-center justify-center gap-4 md:gap-12">
                        <span className="hidden md:block w-[100px] h-[1px] bg-[var(--color-accent)] opacity-50"></span>
                        <VelocityText skewIntensity={-2} className="font-display italic text-[15vw] leading-none tracking-tight text-neutral-500">
                            VISION
                        </VelocityText>
                        <span className="hidden md:block w-[100px] h-[1px] bg-[var(--color-accent)] opacity-50"></span>
                    </div>
                </div>

                {/* BOTTOM FLOATING UI */}
                <div className="flex justify-between items-end w-full pb-8">
                    <div className="hidden md:flex flex-col gap-4 max-w-sm">
                        <div className="flex items-center gap-4 font-mono text-xs tracking-wider opacity-60 mix-blend-difference">
                            <span>{time}</span>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                                <span>AVAILABLE FOR WORK</span>
                            </div>
                        </div>
                        <div className="font-sans text-sm opacity-70 leading-relaxed">
                            <p>Specialized in high-performance frontends and interactive design systems. Crafting digital experiences that feel heavier than they look.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <span className="text-sm font-mono tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">SCROLL</span>
                            <div className="p-3 border border-white/10 rounded-full group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/10 transition-colors">
                                <ArrowDown className="w-5 h-5 text-[#EAEAEA] group-hover:text-[var(--color-accent)] transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sticky "Magazine" Side Label */}
            <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 -rotate-90 origin-left hidden md:flex items-center gap-4 mix-blend-exclusion">
                <span className="text-xs font-mono tracking-[0.2em] text-[var(--color-accent)]">VOL. 01</span>
                <span className="w-12 h-[1px] bg-white/20"></span>
                <span className="text-xs font-mono tracking-[0.2em]">CASE STUDIES</span>
            </div>
        </section>
    );
};
