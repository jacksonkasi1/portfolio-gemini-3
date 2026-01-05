import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

// DIMENSIONS
const SIZE = 80;
const THICKNESS = 16;

// Helper to create a 3D Box (Prism) - Updated colors as requested
const Bar3D = ({ rotateX = 0, rotateY = 0, rotateZ = 0 }) => (
    <div
        style={{
            position: 'absolute',
            width: THICKNESS,
            height: SIZE * 2,
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
            transformStyle: 'preserve-3d',
        }}
    >
        {/* Front Face - Pure Black */}
        <div className="absolute inset-0 bg-black" style={{ transform: `translateZ(${THICKNESS / 2}px)` }} />
        {/* Back Face - Pure Black */}
        <div className="absolute inset-0 bg-black" style={{ transform: `translateZ(-${THICKNESS / 2}px) rotateY(180deg)` }} />
        {/* Left Face - Dark Grey */}
        <div className="absolute bg-neutral-900" style={{ width: THICKNESS, height: SIZE * 2, transform: `translateX(-${THICKNESS / 2}px) rotateY(-90deg)` }} />
        {/* Right Face - Dark Grey */}
        <div className="absolute bg-neutral-900" style={{ width: THICKNESS, height: SIZE * 2, transform: `translateX(${THICKNESS / 2}px) rotateY(90deg)` }} />
        {/* Top Face - Dark Grey */}
        <div className="absolute bg-neutral-800" style={{ width: THICKNESS, height: THICKNESS, transform: `translateY(-${THICKNESS / 2}px) rotateX(90deg)` }} />
        {/* Bottom Face - Dark Grey */}
        <div className="absolute bg-neutral-800" style={{ width: THICKNESS, height: THICKNESS, top: 'auto', bottom: 0, transform: `translateY(${THICKNESS / 2}px) rotateX(-90deg)` }} />
    </div>
);

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    // Phase 0: Tumble (0-5.5s)
    // Phase 1: Reveal Text (3.5s)
    // Phase 2: Zoom (5.5s)
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // TIMELINE:
        // 0.0s - 4.2s: Continuous Fluid Tumble
        // 3.5s: Reveal Text
        // 5.5s: Zoom/Enter Page

        const textTimer = setTimeout(() => setPhase(1), 3500);
        const zoomTimer = setTimeout(() => setPhase(2), 5500);
        const completeTimer = setTimeout(() => onComplete(), 6500);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(zoomTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden perspective-container"
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
        >
            <style>{`
                .perspective-container {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>

            {/* --- 3D SCENE ROOT --- */}
            {/* The 3D Object is in a normal layer (no blend mode) to stay Black on White */}
            <motion.div
                className="relative preserve-3d flex items-center justify-center -z-0"
                initial={{ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }}
                animate={{
                    // SINGLE CONTINUOUS ANIMATION:
                    // 360 (Full Spin) + 35.264 (Isometric Angle) = 395.264
                    // This ensures it flows from spin directly into the lock position.
                    rotateX: phase === 2 ? 395.264 : [0, 395.264],
                    rotateY: phase === 2 ? 405 : [0, 405],     // 360 + 45
                    rotateZ: phase === 2 ? 360 : [0, 360],     // Full 360 spin on Z
                    scale: phase === 2 ? 60 : 1,
                }}
                transition={{
                    // One long, elegant easeInOut curve for the rotation.
                    rotateX: phase === 2 ? { duration: 0 } : { duration: 4.2, ease: "easeInOut" },
                    rotateY: phase === 2 ? { duration: 0 } : { duration: 4.2, ease: "easeInOut" },
                    rotateZ: phase === 2 ? { duration: 0 } : { duration: 4.2, ease: "easeInOut" },
                    // Zoom happens independently when phase 2 triggers
                    scale: phase === 2
                        ? { duration: 0.8, ease: [0.8, 0, 0.2, 1] }
                        : { duration: 0.2 },
                }}
            >
                {/* THE 3D OBJECT (Black Jack) */}
                <Bar3D rotateZ={0} />
                <Bar3D rotateZ={90} />
                <Bar3D rotateX={90} />
            </motion.div>

            {/* --- TEXT REVEAL --- */}
            {/* Sibling Layer for Blend Mode Difference */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white z-10">
                <div className="flex items-center gap-0 overflow-hidden">

                    {/* Left Text: BEYOND DESIGN */}
                    <div className="overflow-hidden pr-4 md:pr-12">
                        <motion.div
                            layoutId="group-beyond"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={phase >= 1 ? { x: "0%", opacity: 1 } : { x: "100%", opacity: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="flex gap-2 md:gap-4 text-3xl md:text-7xl font-black tracking-tighter uppercase text-right"
                        >
                            <span>BEYOND</span>
                            <span>DESIGN</span>
                        </motion.div>
                    </div>

                    {/* SPACER (To keep text pushed apart around the object) */}
                    <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0" />

                    {/* Right Text: INTO EXPERIENCE */}
                    <div className="overflow-hidden pl-4 md:pl-12">
                        <motion.div
                            layoutId="group-into"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={phase >= 1 ? { x: "0%", opacity: 1 } : { x: "-100%", opacity: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="flex gap-2 md:gap-4 text-3xl md:text-7xl font-black tracking-tighter uppercase text-left"
                        >
                            <span>INTO</span>
                            <span>EXPERIENCE</span>
                        </motion.div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};
