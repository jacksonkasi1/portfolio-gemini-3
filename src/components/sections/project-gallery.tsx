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
            <ParallaxSection offset={-30}>
                <div className="container mx-auto px-6 md:px-12 mb-20">
                    <SectionTitle title="Selected Works" />
                </div>
            </ParallaxSection>

            <div className="container mx-auto px-6 md:px-12 relative">
                <div className="flex flex-col">
                    {DATA.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group relative border-t border-neutral-900 py-12 cursor-none"
                            onMouseEnter={() => { setHoveredProject(project.id); playHover(); }}
                            onMouseLeave={() => setHoveredProject(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row items-baseline justify-between transition-opacity duration-300 group-hover:opacity-100 opacity-50">
                                <span className="font-mono text-xs text-red-600 mb-2 md:mb-0">(00{index + 1})</span>
                                <h3 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                    {project.title}
                                </h3>
                                <div className="hidden md:flex gap-2">
                                    {project.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="text-[10px] uppercase font-mono border border-neutral-800 px-2 py-1 rounded-full text-neutral-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 md:hidden text-neutral-500 text-sm">
                                {project.description}
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
                        animate={{ opacity: 1, scale: 1, x: x + 20, y: y - 100 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="w-[400px] h-[250px] bg-neutral-900 border border-neutral-800 relative">
                            <div className={`w-full h-full opacity-50 bg-gradient-to-br from-neutral-800 to-black relative overflow-hidden`}>
                                <div className="absolute inset-0 noise-overlay opacity-50" />
                                <div className="absolute bottom-4 left-4 text-white font-mono text-xs uppercase tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">
                                    {DATA.projects.find(p => p.id === hoveredProject)?.category}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-32 h-32 border border-white rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute w-48 h-48 border border-red-900 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
