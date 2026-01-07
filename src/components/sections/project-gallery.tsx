import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '../../data/portfolio';
import { useMousePosition } from '../../hooks/use-mouse-position';
import { useAudioFeedback } from '../../hooks/use-audio-feedback';
import { SectionTitle } from '../ui/section-title';
import { ParallaxSection } from '../ui/parallax-section';

export const ProjectGallery = () => {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const { x, y } = useMousePosition();
    const { playHover } = useAudioFeedback();

    return (
        <section id="work" className="py-32 relative z-20">
            <ParallaxSection offset={-20}>
                <div className="container mx-auto px-6 md:px-12 mb-20 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-red-500">(02)</span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        Selected Works
                    </h2>
                </div>
            </ParallaxSection>

            <div className="container mx-auto px-6 md:px-12 relative"
                onMouseLeave={() => setHoveredProject(null)}>
                <div className="flex flex-col">
                    {DATA.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`group relative border-t border-neutral-800 py-16 cursor-none transition-all duration-500 ease-out ${hoveredProject && hoveredProject !== project.id ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}
                            onMouseEnter={() => { setHoveredProject(project.id); playHover(); }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row items-baseline justify-between">
                                <span className="font-mono text-xs text-neutral-500 mb-2 md:mb-0 w-24">0{index + 1}</span>

                                <div className="flex-1">
                                    <h3 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white group-hover:text-red-500 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-xs md:text-sm text-neutral-500 mt-2 uppercase tracking-widest group-hover:text-white transition-colors">
                                        {project.category} — {project.year}
                                    </p>
                                </div>

                                <div className="hidden md:flex gap-4 mt-4 md:mt-0">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500 group-hover:scale-110 transition-all duration-300">
                                        <div className="w-2 h-2 bg-white rounded-full group-hover:bg-red-900/10 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        className="fixed pointer-events-none hidden md:block z-50 overflow-hidden"
                        style={{ left: 0, top: 0, x, y }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: x + 40, y: y - 100 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
                    >
                        <div className="w-[400px] h-[280px] bg-neutral-900 border border-neutral-800 relative shadow-2xl shadow-red-900/10">
                            {/* Abstract Preview */}
                            <div className="w-full h-full relative overflow-hidden bg-black">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black" />

                                {/* Double Spinning Circles */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="w-32 h-32 border border-white rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute w-48 h-48 border border-neutral-700 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                </div>

                                {/* Category Label */}
                                <div className="absolute bottom-4 left-4 text-white font-mono text-xs uppercase tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">
                                    {DATA.projects.find(p => p.id === hoveredProject)?.category}
                                </div>

                                {/* Title Initials */}
                                <div className="absolute bottom-6 right-6 font-display text-4xl font-bold text-white/10">
                                    {DATA.projects.find(p => p.id === hoveredProject)?.title.substring(0, 2)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
