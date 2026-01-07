import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, X, ArrowDown } from 'lucide-react';

export const Hero = () => {
    // Parallax logic for background
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
    const rotateBar = useTransform(scrollY, [0, 1000], [45, 60]);

    // Forceful easing for the "Slam" / Land
    const landEase = [0.6, 0.05, -0.01, 0.9] as const; // Cubic-bezier from prompt

    return (
        <section id="index" className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center p-6 md:p-12 text-white">

            {/* Background 3D Bars - subtle */}
            <div className="absolute inset-0 select-none pointer-events-none overflow-hidden"
                style={{ perspective: '1000px' }}>
                <motion.div
                    style={{ rotateZ: -30, rotateX: 45, y: yHero, rotate: rotateBar }}
                    className="absolute -top-[50%] -left-[50%] w-[200vw] h-[200vh] opacity-[0.03] flex flex-col gap-32"
                >
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-full h-32 bg-white" />
                    ))}
                </motion.div>
            </div>

            {/* MAIN CONTENT STACK */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center gap-4 md:gap-12">

                {/* 1. TOP HALF: BEYOND CODE */}
                <div className="w-full">
                    <motion.div
                        layoutId="group-beyond"
                        transition={{ duration: 0.8, ease: landEase }}
                        className="flex flex-col md:block text-[12vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase font-sans origin-left text-left"
                    >
                        <span>BEYOND</span>
                        <br className="hidden md:block" />
                        <span className="text-neutral-500 md:ml-24">CODE</span>
                    </motion.div>
                </div>

                {/* 2. BOTTOM HALF: INTO SOLUTION (Bottom-Right) */}
                <div className="w-full flex justify-end items-end pt-12 md:pt-0"> {/* Added flex justify-end */}
                    <motion.div
                        layoutId="group-into"
                        transition={{ duration: 0.8, ease: landEase }}
                        className="flex flex-col md:block text-[12vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase font-sans origin-right text-right"
                    >
                        <span className="text-neutral-500">INTO</span>
                        <br className="hidden md:block" />
                        <span>SOLUTION</span>
                    </motion.div>
                </div>

            </div>


            {/* BOTTOM UI (Secondary Elements) */}
            <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 flex justify-between items-end">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }} // Delay until after text lands
                    className="flex items-center gap-3"
                >
                    <div className="border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 bg-black/50 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400">
                            2020-2025
                        </span>
                    </div>
                </motion.div>

                {/* Center Scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="hidden md:flex flex-col items-center gap-2 text-neutral-600"
                >
                    <ArrowDown size={20} className="animate-bounce" />
                </motion.div>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <button className="text-[10px] uppercase tracking-widest font-mono text-white/50 border-b border-transparent hover:border-white transition-colors">
                        Last Five Years
                    </button>
                </motion.div>
            </div>

            {/* DECORATIVE GLYPHS (Fade in) */}
            <motion.div
                className="absolute top-12 right-12 hidden md:flex gap-2 text-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <Plus size={16} />
                <X size={16} />
            </motion.div>

        </section>
    );
};
