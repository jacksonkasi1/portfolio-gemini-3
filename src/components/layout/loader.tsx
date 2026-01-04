import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    phase: number;
}

export const Loader: React.FC<LoaderProps> = ({ phase }) => {
    // Easing curves
    const easeSmooth = [0.65, 0, 0.35, 1] as const;
    const easeSnap = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
            <div className="relative flex items-center justify-center w-full h-full overflow-hidden">

                {/* SCENE B: Text Reveal - Slide Out from Center */}
                {/* We use a container that is technically always there but reveals content */}
                <div className="absolute z-20 flex items-center gap-8 md:gap-32 pointer-events-none mix-blend-difference">
                    {/* Left Phase */}
                    <div className="overflow-hidden text-right">
                        <motion.span
                            className="block text-xl md:text-3xl font-black tracking-tighter text-black uppercase"
                            initial={{ x: 50, opacity: 0 }}
                            animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                            transition={{ duration: 0.8, ease: easeSnap }}
                        >
                            BEYOND
                        </motion.span>
                    </div>

                    {/* Spacer for the symbol */}
                    <div className="w-16 md:w-24" />

                    {/* Right Phase */}
                    <div className="overflow-hidden text-left">
                        <motion.span
                            className="block text-xl md:text-3xl font-black tracking-tighter text-black uppercase"
                            initial={{ x: -50, opacity: 0 }}
                            animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                            transition={{ duration: 0.8, ease: easeSnap }}
                        >
                            LOGIC
                        </motion.span>
                    </div>
                </div>

                {/* SCENE A & C: The Symbol */}
                <div className="absolute z-10 flex items-center justify-center">
                    {/* The Primary Cross/Plus */}
                    <motion.div
                        className="relative flex items-center justify-center"
                        animate={phase >= 2 ? {
                            rotate: 90,
                            scale: 80, // Massive expansion to fill screen
                        } : {
                            rotate: phase === 0 ? [0, 45, 0] : 0,
                            scale: 1
                        }}
                        transition={phase >= 2 ? {
                            duration: 1.2,
                            ease: easeSmooth
                        } : {
                            rotate: {
                                duration: 3.0,
                                times: [0, 0.4, 0.8],
                                ease: easeSmooth
                            }
                        }}
                    >
                        {/* Horizontal Bar */}
                        <motion.div className="absolute w-24 h-6 md:w-32 md:h-8 bg-black" />
                        {/* Vertical Bar */}
                        <motion.div className="absolute w-6 h-24 md:w-8 md:h-32 bg-black" />
                    </motion.div>

                    {/* The Secondary Cross (Ghost) */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, rotate: 45 }}
                        animate={phase >= 2 ? {
                            opacity: 1,
                            scale: 80,
                            rotate: 45
                        } : {
                            opacity: phase === 0 ? [0, 0, 1] : 1,
                        }}
                        transition={phase >= 2 ? {
                            duration: 1.2,
                            ease: easeSmooth
                        } : {
                            opacity: { delay: 2.0, duration: 0.5 }
                        }}
                    >
                        <div className="absolute w-24 h-6 md:w-32 md:h-8 bg-black" />
                        <div className="absolute w-6 h-24 md:w-8 md:h-32 bg-black" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
