// ** import core
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ** import ui
import { VelocityText } from '@/components/ui/velocity-text';

// Helper component for each line
const ScrollLine = ({
    text,
    highlight = false,
    redCap = null,
    progress,
    range,
}: {
    text: string;
    highlight?: boolean;
    redCap?: string | null;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    // Simplified phases for smoother, linear animation
    const phase1 = range[0] + (range[1] - range[0]) * 0.20; // Fade In complete
    const phase2 = range[0] + (range[1] - range[0]) * 0.80; // Start Fade Out

    // Opacity: Smooth fade in/out
    const opacity = useTransform(progress, [range[0], phase1, phase2, range[1]], [0, 1, 1, 0]);

    // Blur: Smooth blur in/out
    const blurVal = useTransform(progress, [range[0], phase1, phase2, range[1]], [8, 0, 0, 8]);
    const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

    // Scale: Subtle scale for depth
    const scale = useTransform(progress, [range[0], phase1, phase2, range[1]], [0.85, 1, 1, 0.85]);

    // Y Position: Linear bottom-to-top movement (compact spacing)
    // Using ±20vh for tight, focused reading experience
    const y = useTransform(progress, [range[0], range[1]], ["20vh", "-20vh"]);

    return (
        <motion.div
            style={{ opacity, filter, scale, y }}
            className={`
                fixed top-1/2 left-0 w-full text-center -translate-y-1/2
                ${highlight ? 'font-black text-[7vw] md:text-[6vw] leading-none text-[#EAEAEA] mix-blend-difference' : 'font-bold text-[3.5vw] md:text-[2.5vw] text-neutral-500'}
                font-display uppercase tracking-tighter whitespace-nowrap z-0
            `}
        >
            <VelocityText skewIntensity={highlight ? 2 : 1}>
                {redCap ? (
                    <>
                        <span className="text-[var(--color-accent)] inline-block">{redCap}</span>{text}
                    </>
                ) : (
                    text
                )}
            </VelocityText>
        </motion.div>
    );
};

export const Philosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="h-[250vh] relative z-20 bg-black isolate">
            <div className="sticky top-0 left-0 right-0 h-screen w-full overflow-hidden bg-black">
                <div className="absolute inset-0">

                    {/*
                    Compact ranges for tight, seamless reading flow
                    Linear bottom-to-top fade animation
                */}

                    {/* Line 1: I DON'T JUST */}
                    <ScrollLine
                        text="I DON'T JUST"
                        progress={scrollYProgress}
                        range={[0.00, 0.20]}
                    />

                    {/* Line 2: WRITE CODE. */}
                    <ScrollLine
                        text="RITE CODE."
                        highlight
                        redCap="W"
                        progress={scrollYProgress}
                        range={[0.12, 0.32]}
                    />

                    {/* Line 3: I ENGINEER */}
                    <ScrollLine
                        text="I ENGINEER"
                        progress={scrollYProgress}
                        range={[0.24, 0.44]}
                    />

                    {/* Line 4: CLARITY */}
                    <ScrollLine
                        text="LARITY"
                        highlight
                        redCap="C"
                        progress={scrollYProgress}
                        range={[0.36, 0.56]}
                    />

                    {/* Line 5: IN A WORLD */}
                    <ScrollLine
                        text="IN A WORLD"
                        progress={scrollYProgress}
                        range={[0.48, 0.68]}
                    />

                    {/* Line 6: OF NOISE. */}
                    <ScrollLine
                        text="OISE."
                        highlight
                        redCap="N"
                        progress={scrollYProgress}
                        range={[0.60, 0.80]}
                    />
                </div>
            </div>
        </section>
    );
};
