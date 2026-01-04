import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, X, ArrowDown } from 'lucide-react';

export const Hero = () => {
    // Parallax logic for background
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
    const rotateBar = useTransform(scrollY, [0, 1000], [45, 60]);

    // Easing for the "Slam"
    const slamEase = [0.1, 0.9, 0.2, 1.0] as const;

    return (
        <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-between p-6 md:p-12 text-white">

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

            {/* Top Area */}
            <div className="relative z-10 w-full flex justify-between items-start">

                {/* HEADLINE TOP-LEFT */}
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-[12vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase font-sans"
                        initial={{ y: '120%', rotate: 5 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.4, ease: slamEase, delay: 0.1 }}
                    >
                        Beyond
                        <br />
                        <span className="text-neutral-500">Pixels</span>
                    </motion.h1>
                </div>

                {/* Micro UI: Glyphs */}
                <motion.div
                    className="hidden md:flex gap-2 text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <Plus size={16} strokeWidth={1} />
                    <X size={16} strokeWidth={1} />
                    <Plus size={16} strokeWidth={1} />
                </motion.div>
            </div>

            {/* Center Area (Optional decorative) */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 hidden md:block">
                <motion.div
                    className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 [writing-mode:vertical-rl] rotate-180"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    SCROLL TO EXPLORE
                </motion.div>
            </div>

            {/* Bottom Area */}
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0">

                {/* Bottom Left Badge */}
                <motion.div
                    className="order-2 md:order-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5, ease: "backOut" }}
                >
                    <div className="border border-white/20 rounded-full px-4 py-2 flex items-center gap-3 bg-black/50 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest font-mono">
                            Last 5 Years of + ×
                        </span>
                    </div>
                </motion.div>

                {/* Scroll Indicator (Center) */}
                <motion.div
                    className="hidden md:flex absolute left-1/2 bottom-12 -translate-x-1/2 flex-col items-center gap-2 text-neutral-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0 }}
                >
                    <ArrowDown className="animate-bounce" size={20} strokeWidth={1} />
                </motion.div>

                {/* HEADLINE BOTTOM-RIGHT */}
                <div className="order-1 md:order-3 overflow-hidden text-right">
                    <motion.h1
                        className="text-[12vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase font-sans"
                        initial={{ y: '120%', rotate: -5 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.4, ease: slamEase, delay: 0.2 }}
                    >
                        <span className="text-neutral-500">Into</span>
                        <br />
                        Logic
                    </motion.h1>
                </div>
            </div>
        </section>
    );
};
