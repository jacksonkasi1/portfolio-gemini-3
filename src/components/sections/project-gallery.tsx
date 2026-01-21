// ** import core
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '../../data/portfolio';
import { useMousePosition } from '../../hooks/use-mouse-position';
import { useAudioFeedback } from '../../hooks/use-audio-feedback';
import { ParallaxSection } from '../ui/parallax-section';
import { ArrowUpRight } from 'lucide-react';

export const ProjectGallery = () => {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const { x, y } = useMousePosition();
    const { playHover } = useAudioFeedback();

    return (
        <section id="work" className="py-32 relative z-20 bg-[#EAEAEA] text-[#080808]">
            <ParallaxSection offset={-20}>
                <div className="container mx-auto px-6 md:px-12 mb-20 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-4">
                        <span className="font-mono text-sm text-[var(--color-accent)] tracking-widest">(02)</span>
                        <h2 className="font-display text-4xl md:text-6xl font-medium uppercase tracking-tight text-[#080808]">
                            Selected Works
                        </h2>
                    </div>
                </div>
            </ParallaxSection>

            <div className="container mx-auto px-6 md:px-12 relative" onMouseLeave={() => setHoveredProject(null)}>
                <div className="flex flex-col border-t border-neutral-300">
                    {DATA.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={`group relative border-b border-neutral-300 py-12 md:py-16 cursor-pointer transition-all duration-500 ease-out ${hoveredProject && hoveredProject !== project.id ? 'opacity-20 blur-[2px] scale-[0.99]' : 'opacity-100 scale-100'}`}
                            onMouseEnter={() => { setHoveredProject(project.id); playHover(); }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 md:gap-12 backdrop-blur-sm">
                                <div className="flex items-baseline gap-6 md:gap-12 flex-1">
                                    <span className="font-mono text-xs text-neutral-500 w-8 tracking-widest">0{index + 1}</span>
                                    <h3 className="font-display text-4xl md:text-7xl font-medium uppercase tracking-tight text-[#080808] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-8 md:gap-24 pl-14 md:pl-0">
                                    <div className="flex flex-col text-right">
                                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-1">{project.category}</span>
                                        <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{project.year}</span>
                                    </div>
                                    <div className="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowUpRight className="w-12 h-12 text-[var(--color-accent)]" />
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
                        animate={{ opacity: 1, scale: 1, x: x + 40, y: y - 150 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
                    >
                        <div className="w-[450px] h-[300px] bg-white border border-neutral-200 relative shadow-2xl shadow-red-900/10">
                            {/* Abstract Preview */}
                            <div className="w-full h-full relative overflow-hidden bg-[#F5F5F5]">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent" />

                                {/* Double Spinning Circles */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <div className="w-32 h-32 border border-black rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute w-48 h-48 border border-neutral-400 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                </div>

                                {/* Category Label */}
                                <div className="absolute bottom-4 left-4 text-[#080808] font-mono text-xs uppercase tracking-widest bg-white/50 px-2 py-1 backdrop-blur-sm border border-black/5">
                                    {DATA.projects.find(p => p.id === hoveredProject)?.category}
                                </div>

                                {/* Link Indicator */}
                                <div className="absolute top-4 right-4 text-neutral-400">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
