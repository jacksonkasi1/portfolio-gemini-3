import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Philosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Opacity transforms
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    const words = [
        { text: "I DON'T JUST", highlight: false },
        { text: "WRITE CODE.", highlight: true },
        { text: "I ENGINEER", highlight: false },
        { text: "CLARITY", highlight: true },
        { text: "IN A WORLD", highlight: false },
        { text: "OF NOISE.", highlight: true },
    ];

    return (
        <section ref={containerRef} className="min-h-screen flex items-center justify-center py-24 relative z-10 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    style={{ y, opacity }}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <div className="font-bold tracking-tighter leading-[0.9] text-[10vw] md:text-[7vw] uppercase font-sans">
                        {words.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: [0.2, 0.65, 0.3, 0.9]
                                }}
                                className={`
                                    ${line.highlight ? 'text-white' : 'text-neutral-600'}
                                    transition-colors duration-500 hover:text-white
                                `}
                            >
                                {line.text}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "100px" }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0, duration: 1.0 }}
                        className="h-[1px] bg-white mt-12 mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="font-mono text-xs md:text-sm text-neutral-400 uppercase tracking-widest max-w-md"
                    >
                        Bridging the void between <span className="text-white">System</span> and <span className="text-white">Soul</span>.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
