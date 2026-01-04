import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="index" className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-black border-b border-neutral-900/50">
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <motion.svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <motion.path d="M0 100 Q 25 50 50 100 T 100 100 V 100 H 0 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2"
                        animate={{ d: ["M0 100 Q 25 50 50 100 T 100 100 V 100 H 0 Z", "M0 100 Q 25 60 50 80 T 100 100 V 100 H 0 Z", "M0 100 Q 25 40 50 90 T 100 100 V 100 H 0 Z", "M0 100 Q 25 50 50 100 T 100 100 V 100 H 0 Z"] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    />
                    <motion.path d="M0 0 Q 50 50 100 0" fill="none" stroke="rgba(220, 38, 38, 0.4)" strokeWidth="0.2"
                        animate={{ d: ["M0 0 Q 50 50 100 0", "M0 0 Q 50 80 100 0", "M0 0 Q 50 30 100 0", "M0 0 Q 50 50 100 0"] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                    />
                </motion.svg>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 text-center mix-blend-difference">
                <div className="overflow-hidden">
                    <motion.h1 style={{ y: y1 }} className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase text-white" layoutId="hero-text-1" transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                        Beyond Design
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1 style={{ y: y2 }} className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase text-transparent stroke-white" style={{ WebkitTextStroke: "1px white", ...{ y: y2 } }} layoutId="hero-text-2" transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
                        Into Experience
                    </motion.h1>
                </div>
            </div>

            <motion.div className="absolute top-24 left-8 md:left-12 hidden md:block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Est. 2020-2026</span>
                </div>
            </motion.div>

            <motion.div className="absolute bottom-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}>
                <a href="#work" className="px-8 py-3 border border-neutral-800 text-neutral-400 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all group overflow-hidden relative">
                    <span className="relative z-10">Explore Works</span>
                    <motion.div className="absolute inset-0 bg-white" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ type: "tween", ease: "circOut", duration: 0.3 }} />
                </a>
            </motion.div>
        </section>
    );
};
