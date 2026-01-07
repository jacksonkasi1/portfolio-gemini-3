import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

// DIMENSIONS
const SIZE = 80;
const THICKNESS = 16;

// Helper to create a 3D Box (Prism)
const Bar3D = ({
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    scale = 1
}) => (
    <motion.div
        style={{
            position: 'absolute',
            width: THICKNESS,
            height: SIZE * 2,
            transformStyle: 'preserve-3d',
        }}
        animate={{
            rotateX,
            rotateY,
            rotateZ,
            scale,
        }}
        transition={{ duration: 0 }}
    >
        <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* Front Face */}
            <div className="absolute inset-0 bg-black" style={{ transform: `translateZ(${THICKNESS / 2}px)` }} />
            {/* Back Face */}
            <div className="absolute inset-0 bg-black" style={{ transform: `translateZ(-${THICKNESS / 2}px) rotateY(180deg)` }} />
            {/* Left Face */}
            <div className="absolute bg-neutral-900" style={{ width: THICKNESS, height: '100%', transform: `translateX(-${THICKNESS / 2}px) rotateY(-90deg)` }} />
            {/* Right Face */}
            <div className="absolute bg-neutral-900" style={{ width: THICKNESS, height: '100%', transform: `translateX(${THICKNESS / 2}px) rotateY(90deg)` }} />
            {/* Top Face */}
            <div className="absolute bg-neutral-800" style={{ width: THICKNESS, height: THICKNESS, transform: `translateY(-${THICKNESS / 2}px) rotateX(90deg)` }} />
            {/* Bottom Face */}
            <div className="absolute bg-neutral-800" style={{ width: THICKNESS, height: THICKNESS, top: 'auto', bottom: 0, transform: `translateY(${THICKNESS / 2}px) rotateX(-90deg)` }} />
        </div>
    </motion.div>
);

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        // TIMELINE (Total 5.5s):
        // 0.0 - 0.9s: Rise (Dot -> Line)
        // 0.9 - 1.8s: Cross Turn
        // 1.8 - 2.8s: Reversal + Jack
        // 2.8 - 4.2s: Tumble to Final Pose (Landing)
        // 4.2 - 5.4s: TEXT REVEAL (Custom Bezier)
        // 5.5s: Zoom

        const startZoom = setTimeout(() => setPhase(2), 5500);
        const finish = setTimeout(() => onComplete(), 6300);

        return () => {
            clearTimeout(startZoom);
            clearTimeout(finish);
        };
    }, [onComplete]);

    // Duration of Phase 1
    const D1 = 5.5;

    // Helper to calc percentage
    const t = (ms: number) => ms / 5500;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden perspective-container"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
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
            <motion.div
                className="relative preserve-3d flex items-center justify-center -z-0"
                initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
                animate={{
                    // CHOREOGRAPHY
                    // 0-0.9: 0,0,0
                    // 0.9-1.8: Z=45 (X Shape)
                    // 1.8-2.8: Z=0 (Plus), X=35, Y=45 (Reveal Depth/Jack)
                    // 2.8-4.2: Tumble to Final Pose (Landed: X=215, Y=225)
                    // 4.2s+: Hold the pose (215, 225, 0)
                    // Phase 2 (Zoom): MAINTENANCE of 215, 225, 0 (No Rotation, just Scale)

                    rotateX: phase === 2 ? 215 : [0, 0, 0, 35, 215, 215, 215],
                    rotateY: phase === 2 ? 225 : [0, 0, 0, 45, 225, 225, 225],
                    rotateZ: phase === 2 ? 0 : [0, 0, 45, 0, 0, 0, 0],

                    scale: phase === 2 ? 60 : 1,
                }}
                transition={{
                    duration: phase === 2 ? 0.8 : D1,
                    times: phase === 2 ? undefined : [
                        0,          // 0
                        t(900),     // 0.9s
                        t(1800),    // 1.8s
                        t(2800),    // 2.8s
                        t(4200),    // 4.2s (Landed)
                        t(5400),    // 5.4s (Text End)
                        1           // 5.5s
                    ],
                    ease: phase === 2 ? [0.8, 0, 0.2, 1] : "easeInOut",
                }}
            >
                {/* BAR 1: Rise */}
                <motion.div
                    className="preserve-3d absolute flex items-center justify-center"
                    initial={{ scaleY: 0.1 }}
                    animate={{
                        scaleY: [0.1, 1, 1, 1, 1, 1, 1]
                    }}
                    transition={{
                        duration: D1,
                        times: [0, t(900), t(1800), t(2800), t(4200), t(5400), 1],
                        ease: "circInOut"
                    }}
                >
                    <Bar3D />
                </motion.div>

                {/* BAR 2: Cross */}
                <motion.div
                    className="preserve-3d absolute flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0, 0, 1, 1, 1, 1, 1]
                    }}
                    transition={{
                        duration: D1,
                        times: [0, t(900), t(1800), t(2800), t(4200), t(5400), 1],
                        ease: "easeInOut"
                    }}
                >
                    <Bar3D rotateZ={90} />
                </motion.div>

                {/* BAR 3: Jack */}
                <motion.div
                    className="preserve-3d absolute flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0, 0, 0, 1, 1, 1, 1]
                    }}
                    transition={{
                        duration: D1,
                        times: [0, t(900), t(1800), t(2800), t(4200), t(5400), 1],
                        ease: "easeInOut"
                    }}
                >
                    <Bar3D rotateX={90} />
                </motion.div>

            </motion.div>

            {/* --- TEXT REVEAL --- 
                Starts at 4.2s (Seamlessly after landing)
                Ends at 5.4s (Custom Bezier)
                Uses absolute positioning anchored to viewport center for perfect symmetry
            */}
            <div className="absolute inset-0 flex items-center pointer-events-none mix-blend-difference text-white z-10">
                {/* Left Text - Anchored to right edge of center */}
                <div className="absolute right-1/2 mr-14 md:mr-20 overflow-hidden">
                    <motion.div
                        layoutId="group-beyond"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{
                            x: phase === 2 ? "0%" : ["100%", "100%", "0%", "0%"],
                            opacity: phase === 2 ? 1 : [0, 0, 1, 1]
                        }}
                        transition={{
                            duration: D1,
                            times: [
                                0,
                                t(4200),
                                t(5400),
                                1
                            ],
                            ease: ["linear", [0.16, 1, 0.3, 1], "linear"]
                        }}
                        className="flex gap-2 md:gap-4 text-2xl md:text-5xl font-black tracking-tighter uppercase text-right whitespace-nowrap"
                    >
                        <span>Beyond</span>
                        <span>Code</span>
                    </motion.div>
                </div>

                {/* Right Text - Anchored to left edge of center */}
                <div className="absolute left-1/2 ml-14 md:ml-20 overflow-hidden">
                    <motion.div
                        layoutId="group-into"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                            x: phase === 2 ? "0%" : ["-100%", "-100%", "0%", "0%"],
                            opacity: phase === 2 ? 1 : [0, 0, 1, 1]
                        }}
                        transition={{
                            duration: D1,
                            times: [
                                0,
                                t(4200),
                                t(5400),
                                1
                            ],
                            ease: ["linear", [0.16, 1, 0.3, 1], "linear"]
                        }}
                        className="flex gap-2 md:gap-4 text-2xl md:text-5xl font-black tracking-tighter uppercase text-left whitespace-nowrap"
                    >
                        <span>Into</span>
                        <span>Solution</span>
                    </motion.div>
                </div>
            </div>

        </motion.div>
    );
};
