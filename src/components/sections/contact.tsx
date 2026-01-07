import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParallaxSection } from '../ui/parallax-section';
import { useAudioFeedback } from '../../hooks/use-audio-feedback';

export const Contact = () => {
    const { playHover } = useAudioFeedback();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-32 relative z-20 min-h-[60vh] flex flex-col justify-center">
            <ParallaxSection offset={-20}>
                <div className="container mx-auto px-6 md:px-12 mb-12 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-red-500">(06)</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        The Invitation
                    </h2>
                </div>
            </ParallaxSection>

            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group"
                    onMouseEnter={() => { setIsHovered(true); playHover(); }}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <a
                        href="mailto:hello@jacksonkasi.dev"
                        className="block relative z-10"
                    >
                        <div className="font-display text-[8vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter text-transparent transition-colors duration-500 whitespace-nowrap"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                            hello@jacksonkasi.dev
                        </div>

                        <div className={`absolute inset-0 font-display text-[8vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter text-red-500 whitespace-nowrap transition-all duration-500 clip-path-inset ${isHovered ? 'clip-path-full' : 'clip-path-empty'}`}
                            style={{ clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}>
                            hello@jacksonkasi.dev
                        </div>
                    </a>
                </motion.div>

                <div className="mt-20 flex flex-col md:flex-row gap-12 font-mono text-xs uppercase tracking-widest text-neutral-500">
                    <div>
                        <span className="block mb-4 text-red-500">On The Web</span>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">GitHub</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
