import React from 'react';
import { motion } from 'framer-motion';
import { MorphingIcon } from '../ui/morphing-icon';

export const Loader = ({ phase }: { phase: number }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
                className="absolute inset-0 bg-white"
                animate={phase === 3 ? { scale: 30, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="relative z-10 flex items-center justify-center">
                <div className="overflow-hidden absolute right-12 whitespace-nowrap">
                    <motion.span
                        className="block font-bold text-sm tracking-widest uppercase text-black"
                        initial={{ x: "100%" }}
                        animate={phase >= 2 ? { x: 0 } : { x: "100%" }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        layoutId="hero-text-1"
                    >
                        Beyond Design
                    </motion.span>
                </div>
                <div className="z-10 px-2">
                    <motion.div className="absolute inset-0 bg-white -z-10" animate={{ opacity: phase >= 3 ? 0 : 1 }} />
                    <div className="text-black"><MorphingIcon phase={phase} /></div>
                </div>
                <div className="overflow-hidden absolute left-12 whitespace-nowrap">
                    <motion.span
                        className="block font-bold text-sm tracking-widest uppercase text-black"
                        initial={{ x: "-100%" }}
                        animate={phase >= 2 ? { x: 0 } : { x: "-100%" }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        layoutId="hero-text-2"
                    >
                        Into Experience
                    </motion.span>
                </div>
            </div>
        </div>
    );
};
